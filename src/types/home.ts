// types/home.ts
export interface HomeSliderItem {
  key: string;
  description: string;
  type: 'file' | 'text';
  uuid: string;
  enabled: boolean;
  value: string[] | string;
}

export interface HomeGalleryItem {
  key: string;
  description: string;
  type: 'file';
  uuid: string;
  enabled: boolean;
  value: string[];
}

export interface HomeTextItem {
  key: string;
  description: string;
  type: 'text';
  uuid: string;
  enabled: boolean;
  value: string;
}

export interface HomeBlogItem {
  title: string;
  text: string;
  uuid: string;
}

export interface HomeSection {
  slider: HomeSliderItem[];
  about: HomeTextItem[];
  history: HomeTextItem[];
  activities: HomeTextItem[];
  whyChoose: {
    title: HomeTextItem;
    details: HomeTextItem;
  };
  gallery: {
    images: HomeGalleryItem[];
    captions: HomeTextItem[];
  };
  blog: HomeBlogItem[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  result: string;
  meta?: {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  };
}