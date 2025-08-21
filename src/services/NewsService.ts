import type { IStorage } from '../types/storage';
import type { News, NewsFormData } from '../types/news';
import { createNews, updateNews, getInitialNews } from '../utils/newsUtils';

export class NewsService {
  private storage: IStorage;
  private readonly STORAGE_KEY = 'news';

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  getAllNews(): News[] {
    const news = this.storage.get<News[]>(this.STORAGE_KEY);
    return news || getInitialNews();
  }

  saveNews(news: News[]): void {
    this.storage.set(this.STORAGE_KEY, news);
  }

  addNews(newsData: NewsFormData): News {
    const allNews = this.getAllNews();
    const newNews = createNews(newsData);
    const updatedNews = [newNews, ...allNews];
    this.saveNews(updatedNews);
    return newNews;
  }

  updateNews(newsId: string, newsData: Partial<NewsFormData>): News | null {
    const allNews = this.getAllNews();
    const newsIndex = allNews.findIndex(news => news.id === newsId);
    
    if (newsIndex === -1) return null;
    
    const updatedNews = updateNews(allNews[newsIndex], newsData);
    allNews[newsIndex] = updatedNews;
    this.saveNews(allNews);
    
    return updatedNews;
  }

  deleteNews(newsId: string): boolean {
    const allNews = this.getAllNews();
    const filteredNews = allNews.filter(news => news.id !== newsId);
    
    if (filteredNews.length === allNews.length) return false;
    
    this.saveNews(filteredNews);
    return true;
  }

  searchNews(query: string): News[] {
    const allNews = this.getAllNews();
    const lowerQuery = query.toLowerCase();
    
    return allNews.filter(news =>
      news.title.toLowerCase().includes(lowerQuery) ||
      news.content.toLowerCase().includes(lowerQuery) ||
      news.author.toLowerCase().includes(lowerQuery)
    );
  }

  clearAllNews(): void {
    this.storage.remove(this.STORAGE_KEY);
  }
}
