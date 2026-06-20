import { useQuery } from "@/hooks/useData";

export interface YouTubeChannelData {
  channelId: string;
  title: string;
  description: string;
  customUrl: string;
  thumbnailUrl: string;
  bannerUrl: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  subscribeUrl: string;
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID as string | undefined;

function formatCount(n: string): string {
  const num = parseInt(n, 10);
  if (isNaN(num)) return n;
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

async function fetchYouTubeChannel(): Promise<YouTubeChannelData | null> {
  if (!API_KEY || !CHANNEL_ID) {
    console.warn("[YouTube] Missing VITE_YOUTUBE_API_KEY or VITE_YOUTUBE_CHANNEL_ID in .env");
    return null;
  }

  // Support both @handle and UC... channel IDs
  const isHandle = CHANNEL_ID.startsWith("@");
  const param = isHandle ? `forHandle=${CHANNEL_ID.slice(1)}` : `id=${CHANNEL_ID}`;
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&${param}&key=${API_KEY}`;
  
  const res = await fetch(url);
  if (!res.ok) {
    console.error("[YouTube] API error:", res.status, await res.text());
    return null;
  }

  const json = await res.json();
  const channel = json.items?.[0];
  if (!channel) return null;

  const snippet = channel.snippet;
  const stats = channel.statistics;
  const branding = channel.brandingSettings;

  const channelId = channel.id as string;

  return {
    channelId,
    title: snippet.title,
    description: snippet.description,
    customUrl: snippet.customUrl || `@${snippet.title.replace(/\s+/g, "")}`,
    thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || "",
    bannerUrl: branding?.image?.bannerExternalUrl
      ? `${branding.image.bannerExternalUrl}=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`
      : "",
    subscriberCount: formatCount(stats.subscriberCount || "0"),
    videoCount: formatCount(stats.videoCount || "0"),
    viewCount: formatCount(stats.viewCount || "0"),
    subscribeUrl: `https://www.youtube.com/channel/${channelId}?sub_confirmation=1`,
  };
}

export function useYouTubeChannel() {
  return useQuery<YouTubeChannelData | null>({
    queryKey: ["youtube", "channel", CHANNEL_ID ?? "none"],
    queryFn: fetchYouTubeChannel,
  });
}
