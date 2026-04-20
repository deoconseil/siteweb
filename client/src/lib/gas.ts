// Google Apps Script Web App URL — hardcoded for self-hosting
// To update: replace the URL below with your new GAS deployment URL
const GAS_URL_DEFAULT = "https://script.google.com/macros/s/AKfycby0b-V18yDy5jaRGAiDiVEf7352FRCHJ9OYL2Cx4IghMs-g2g3SXBJdKTA-49k6zCEc/exec";
export const GAS_URL = (import.meta.env.VITE_GAS_URL as string) || GAS_URL_DEFAULT;

// Cloudinary config (public — unsigned upload preset) — hardcoded for self-hosting
export const CLOUDINARY_CLOUD_NAME = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string) || "dywocv2it";
export const CLOUDINARY_UPLOAD_PRESET = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string) || "deo_conseil_unsigned";

interface GasResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

/**
 * Call GAS endpoint (GET with query params)
 */
export async function gasGet<T = unknown>(params: Record<string, string>): Promise<GasResponse<T>> {
  try {
    const url = new URL(GAS_URL);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    const res = await fetch(url.toString(), { mode: "cors" });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const json = await res.json();
    // GAS returns { ok, data } or { error }
    if (json.ok === false) return { ok: false, error: json.error || "Erreur GAS" };
    return { ok: true, data: json.data ?? json };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Erreur réseau" };
  }
}

/**
 * Call GAS endpoint (POST with JSON body).
 *
 * Google Apps Script returns a 302 redirect after POST.
 * The browser's fetch() converts POST→GET on 302 (HTTP spec), which loses the body.
 * Fix: use redirect:"follow" — the browser follows the redirect to the echo URL
 * which already contains the response. The redirect URL is a GET so it works fine.
 *
 * For environments that block redirects (no-cors), we fall back to a no-redirect
 * fetch and read the Location header manually.
 */
export async function gasPost<T = unknown>(body: Record<string, unknown>): Promise<GasResponse<T>> {
  try {
    // Step 1: POST to GAS — follow redirect automatically
    // fetch with redirect:"follow" will follow the 302 to the echo URL (GET)
    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" }, // GAS requires text/plain for CORS
      body: JSON.stringify(body),
      mode: "cors",
      redirect: "follow",
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const text = await res.text();
    let json: Record<string, unknown>;
    try {
      json = JSON.parse(text);
    } catch {
      return { ok: false, error: "Réponse non-JSON du serveur" };
    }
    if (json.ok === false) return { ok: false, error: (json.error as string) || "Erreur GAS" };
    return { ok: true, data: (json.data ?? json) as T };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Erreur réseau" };
  }
}

/**
 * Upload image to Cloudinary (unsigned upload)
 */
export async function uploadToCloudinary(
  file: File,
  folder: "blog" | "actualites" | "references"
): Promise<{ url: string; public_id: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", `deo-conseil/${folder}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Cloudinary upload failed");
  }
  const data = await res.json();
  return { url: data.secure_url, public_id: data.public_id };
}

/**
 * Export array of objects to CSV and trigger download
 */
export function exportToXlsx(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => row[h] ?? ""));
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Generate slug from title
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
