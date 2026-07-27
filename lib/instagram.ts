export interface InstagramPost {
  id: string;
  caption?: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
}

const GRAPH_BASE = 'https://graph.facebook.com/v21.0';

async function resolveUserId(token: string): Promise<string | null> {
  const response = await fetch(`${GRAPH_BASE}/me?fields=id&access_token=${token}`, {
    next: { revalidate: 86400 },
  });
  const json = await response.json();

  if (json.error) throw new Error(json.error.message);

  return json.id ?? null;
}

export async function getInstagramPosts(limit = 3): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const userId = process.env.INSTAGRAM_USER_ID || (await resolveUserId(token));
    if (!userId) return [];

    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
    const url = `${GRAPH_BASE}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;

    const response = await fetch(url, { next: { revalidate: 3600 } });
    const json = await response.json();

    if (json.error) throw new Error(json.error.message);

    return (json.data ?? []).map((post: Record<string, string>) => ({
      id: post.id,
      caption: post.caption,
      mediaType: post.media_type as InstagramPost['mediaType'],
      mediaUrl: post.media_url,
      thumbnailUrl: post.thumbnail_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
    }));
  } catch (error) {
    console.error('[getInstagramPosts] failed:', error);
    return [];
  }
}
