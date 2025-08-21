export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsFormData {
  title: string;
  content: string;
  author: string;
}
