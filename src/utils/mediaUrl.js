/**
 * Media URL ni to'g'ri hal qiladi.
 * - Agar `file` allaqachon to'liq URL bo'lsa (http/https bilan boshlansa), shundayligicha qaytaradi.
 * - Aks holda VITE_API_MEDIA_URL ni oldiga qo'shib qaytaradi.
 */
const BASE_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL || "";

export function resolveMediaUrl(file) {
  if (!file) return null;
  if (/^https?:\/\//i.test(file)) return file;
  // Ikkilangan slash oldini olish
  const base = BASE_MEDIA_URL.replace(/\/$/, "");
  const path = file.startsWith("/") ? file : `/${file}`;
  return `${base}${path}`;
}
