"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Send, X, Loader2 } from "lucide-react";

import { PageHeading } from "@/features/dashboard/PageHeading";
import { PropertyInfoForm, type PropertyInfo } from "@/features/new-listing/PropertyInfoForm";
import { LocationForm, type LocationInfo } from "@/features/new-listing/LocationForm";
import { OwnerForm, type OwnerInfo } from "@/features/new-listing/OwnerForm";
import { PhotosUpload, type PhotoEntry } from "@/features/new-listing/PhotosUpload";
import { Timeline } from "@/features/new-listing/Timeline";
import { Button } from "@/components/ui/Button";
import { ApiError, propertiesApi, usersApi } from "@/lib/api";
import type { Property, PropertyCreatePayload, PropertyValidation, User } from "@/lib/types";

export default function UpdatePropertyPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [info, setInfo] = useState<PropertyInfo | null>(null);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [owner, setOwner] = useState<OwnerInfo | null>(null);
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [responsibles, setResponsibles] = useState<User[]>([]);

  return null; // Implementation in next steps
}
