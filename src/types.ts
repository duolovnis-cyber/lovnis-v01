export interface TrackItem {
  number: number;
  title: string;
  duration: string;
  side: 'ONE' | 'TWO';
  guests?: string;
  notes?: string;
  previewUrl?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'music-video' | 'live';
  year?: string;
  youtubeQuery: string;
  youtubeId?: string;
  youtubeUrl: string;
  description: string;
  thumbnail?: string;
}

export interface PressItem {
  id: string;
  outlet: string;
  headline: string;
  snippet: string;
  tag: string;
  accentColor?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  iconName: 'youtube' | 'spotify' | 'disc' | 'cloud' | 'globe' | 'instagram';
  description: string;
  primaryAction: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  location: string;
  imageUrl?: string;
}

export interface MerchItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  format: string;
  image: string;
  hoverImage?: string;
  isPreorder?: boolean;
  badge?: string;
  deliveryForecast: string;
  description: string;
  features: string[];
}

