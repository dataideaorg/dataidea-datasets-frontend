export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Dataset {
  id: number;
  title: string;
  slug: string;
  description: string;
  file: string;
  file_size?: number;
  file_type?: string;
  categories: Category[];
  tags: string;
  author: User;
  source_url?: string;
  license?: string;
  download_count: number;
  created_at: string;
  updated_at: string;
} 