"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { notificationsApi, getToken } from "./api";
import { useAuth } from "./auth";
import type { Notification } from "./types";

type NotificationContextValue = {
  notifications: Notification[];
  unreadCount: number;
  markAllAsRead: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { status, user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
    [notifications]
  );

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await notificationsApi.list();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true }))
      );
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && user) {
      void fetchNotifications();

      let ws: WebSocket | null = null;
      let reconnectTimer: any = null;
      let intentionalClose = false;

      const connect = () => {
        const token = getToken();
        if (!token) return;

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        const wsUrl =
          apiUrl.replace(/^http/, "ws") + "/notifications/ws?token=" + token;

        ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
          try {
            const newNotification: Notification = JSON.parse(event.data);
            setNotifications((prev) => [newNotification, ...prev]);
          } catch (error) {
            console.error("Failed to parse websocket message:", error);
          }
        };

        ws.onclose = () => {
          if (!intentionalClose) {
            console.log("WebSocket connection closed. Reconnecting...");
            reconnectTimer = setTimeout(connect, 5000);
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          ws?.close();
        };
      };

      connect();

      return () => {
        intentionalClose = true;
        if (reconnectTimer) clearTimeout(reconnectTimer);
        ws?.close();
      };
    } else {
      setNotifications([]);
    }
  }, [status, user, fetchNotifications]);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      markAllAsRead,
    }),
    [notifications, unreadCount, markAllAsRead]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
