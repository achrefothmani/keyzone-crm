"use client";

import { Notification } from "@/lib/types";
import { formatRelative, cn } from "@/lib/utils";
import Link from "next/link";
import { Bell } from "lucide-react";

interface NotificationListProps {
  notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-3">
          <Bell className="w-6 h-6 text-ink-soft" strokeWidth={1.5} />
        </div>
        <p className="text-[14px] font-medium text-ink">Pas de notifications</p>
        <p className="text-[12px] text-ink-muted mt-1">
          Vous serez averti ici lorsqu'il y aura du nouveau.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-line overflow-y-auto max-h-[400px]">
      {notifications.map((notification) => (
        <Link
          key={notification.id}
          href={notification.link || "#"}
          className={cn(
            "block p-4 transition-colors hover:bg-surface/50",
            !notification.is_read ? "bg-gold-mist" : "bg-canvas"
          )}
        >
          <div className="flex gap-3">
            {!notification.is_read && (
              <div className="mt-1.5 w-2 h-2 rounded-full bg-gold shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p
                  className={`text-[13px] leading-tight mb-1 truncate ${
                    !notification.is_read ? "font-semibold text-ink" : "font-medium text-ink-soft"
                  }`}
                >
                  {notification.title}
                </p>
                <span className="text-[10px] text-ink-muted whitespace-nowrap pt-0.5">
                  {formatRelative(notification.created_at)}
                </span>
              </div>
              <p className="text-[12px] text-ink-muted line-clamp-2 leading-relaxed">
                {notification.message}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
