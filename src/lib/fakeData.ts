import { extractYouTubeId, youtubeThumbnail } from "./youtube";

const fakeVideosData = [
  {
    id: "1",
    youtube_url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    title: "The Future of Artificial Intelligence",
    description: "A deep dive into how AI will change our world in the next 10 years.",
    category: "Artificial Intelligence",
    published_at: new Date().toISOString(),
    is_featured: true,
  },
  {
    id: "2",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Exploring the Edge of the Universe",
    description: "What lies beyond the observable universe?",
    category: "Space & Cosmos",
    published_at: new Date(Date.now() - 86400000).toISOString(),
    is_featured: true,
  },
  {
    id: "3",
    youtube_url: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    title: "Quantum Physics Explained",
    description: "The weird world of quantum mechanics made simple.",
    category: "Physics",
    published_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    is_featured: true,
  },
  {
    id: "4",
    youtube_url: "https://www.youtube.com/watch?v=bHQqvYy5KYo",
    title: "Brain-Computer Interfaces",
    description: "How close are we to merging with machines?",
    category: "Future Tech",
    published_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    is_featured: false,
  }
];

export const fakeVideos = fakeVideosData.map(v => ({
  ...v,
  youtube_id: extractYouTubeId(v.youtube_url) || "",
  thumbnail_url: youtubeThumbnail(v.youtube_url, "max")
}));

export const fakeProducts = [
  {
    id: "1",
    name: "Dimension Hoodie",
    description: "Premium heavyweight cotton hoodie with our subtle embroidered logo.",
    price: 65.00,
    category: "Merch",
    image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    buy_url: "#",
  },
  {
    id: "2",
    name: "Cosmos Coffee Mug",
    description: "Matte black ceramic mug perfect for late night coding or stargazing.",
    price: 24.00,
    category: "Accessories",
    image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop",
    buy_url: "#",
  },
  {
    id: "3",
    name: "Quantum Field Theory Poster",
    description: "Beautifully designed educational poster explaining the basics of QFT.",
    price: 35.00,
    category: "Art",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
    buy_url: "#",
  }
];
