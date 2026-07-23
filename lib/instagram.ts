export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  timestamp: string;
}

interface InstagramApiMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  timestamp: string;
}

interface InstagramApiResponse {
  data: InstagramApiMedia[];
}

export async function getInstagramPosts(
  accessToken: string,
  count: number,
): Promise<InstagramPost[]> {
  const fields = 'id,caption,media_type,media_url,permalink,timestamp';
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${count}&access_token=${accessToken}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (response.ok === false) {
    throw new Error(`Instagram API request failed with status ${response.status}`);
  }

  const { data } = (await response.json()) as InstagramApiResponse;

  return data.map((media) => ({
    id: media.id,
    imageUrl: media.media_url,
    caption: media.caption ?? '',
    permalink: media.permalink,
    timestamp: media.timestamp,
  }));
}

const PLACEHOLDER_CAPTIONS = [
  'Świeżo po pełnym detailingu — lakier lśni jak nowy. ✨ #detailing #wbcars',
  'Powłoka ceramiczna nałożona. Ochrona na lata i głęboki połysk. 🛡️',
  'Korekta lakieru krok po kroku. Zobacz różnicę przed i po! 🔧',
  'Czyszczenie wnętrza premium — każdy detal ma znaczenie. 🧼',
  'Folia PPF na masce — niewidoczna ochrona przed odpryskami. 🚗',
  'Auto klienta gotowe do odbioru. Dziękujemy za zaufanie! 🙏',
  'Mycie bezdotykowe i dekontaminacja lakieru. Podstawa każdego detailingu. 💧',
  'Renowacja reflektorów — pełna widoczność i estetyka. 💡',
  'Zabezpieczenie felg powłoką ceramiczną. Łatwiejsze mycie na co dzień. ⚙️',
  'Głęboka regeneracja skórzanej tapicerki. Jak nowa! 🪑',
  'Nowy projekt w naszym warsztacie. Śledź efekty na naszym profilu! 📸',
  'Detailing samochodu sportowego — perfekcja w każdym calu. 🏁',
];

export const PLACEHOLDER_POSTS: InstagramPost[] = Array.from({ length: 12 }, (_, i) => ({
  id: `placeholder-${i + 1}`,
  imageUrl: `https://picsum.photos/600/600?random=${i + 1}`,
  caption: PLACEHOLDER_CAPTIONS[i % PLACEHOLDER_CAPTIONS.length],
  permalink: `https://instagram.com/p/placeholder-${i + 1}`,
  timestamp: new Date(Date.now() - i * 86_400_000).toISOString(),
}));
