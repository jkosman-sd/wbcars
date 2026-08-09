export function getSiteUrl(rawUrl?: string | null): string | null {
  if (!rawUrl) return null;

  return rawUrl.replace(/\/+$/, '');
}
