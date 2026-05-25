import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { PageInfo, PaginatedResponse } from "./types";

export const normalizeText = (value?: string | null) => (value || "").toLowerCase().trim();

export const docWithId = <T extends object>(docSnap: QueryDocumentSnapshot): T & { id: string } => ({
  id: docSnap.id,
  ...(docSnap.data() as T),
});

export const timestampToMillis = (value: unknown): number => {
  if (!value) return 0;
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "object" && "toMillis" in value && typeof (value as any).toMillis === "function") {
    return (value as any).toMillis();
  }
  if (typeof value === "number") return value;
  return 0;
};

export const sortByCreatedAtDesc = <T extends { createdAt?: unknown }>(items: T[]) => {
  return [...items].sort((a, b) => timestampToMillis(b.createdAt) - timestampToMillis(a.createdAt));
};

export const paginate = <T>(items: T[], page = 1, perPage = 10): PaginatedResponse<T> => {
  const safePage = Math.max(Number(page) || 1, 1);
  const safePerPage = Math.max(Number(perPage) || 10, 1);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / safePerPage);
  const start = (safePage - 1) * safePerPage;
  const data = items.slice(start, start + safePerPage);

  const pageInfo: PageInfo = {
    totalItems,
    totalPages,
    remainingPages: Math.max(totalPages - safePage, 0),
    nextPage: safePage < totalPages ? safePage + 1 : null,
    prevPage: safePage > 1 && totalPages > 0 ? safePage - 1 : null,
  };

  return { data, pageInfo };
};
