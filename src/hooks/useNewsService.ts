import { useState, useEffect, useCallback } from 'react';
import { NewsService } from '../services/NewsService';
import { storageFactory } from '../storage/StorageFactory';
import { log } from '../utils/logger';
import type { News, NewsFormData } from '../types/news';

export function useNewsService() {
  const [newsService] = useState(() => new NewsService(storageFactory.createStorage()));
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем новости при инициализации
  useEffect(() => {
    const loadNews = () => {
      setIsLoading(true);
      try {
        const allNews = newsService.getAllNews();
        setNews(allNews);
      } catch (error) {
        log.error('Error loading news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [newsService]);

  // Добавление новости
  const addNews = useCallback((newsData: NewsFormData): News => {
    const newNews = newsService.addNews(newsData);
    setNews(prevNews => [newNews, ...prevNews]);
    return newNews;
  }, [newsService]);

  // Обновление новости
  const updateNews = useCallback((newsId: string, newsData: Partial<NewsFormData>): boolean => {
    const updatedNews = newsService.updateNews(newsId, newsData);
    if (updatedNews) {
      setNews(prevNews => 
        prevNews.map(news => 
          news.id === newsId ? updatedNews : news
        )
      );
      return true;
    }
    return false;
  }, [newsService]);

  // Удаление новости
  const deleteNews = useCallback((newsId: string): boolean => {
    const success = newsService.deleteNews(newsId);
    if (success) {
      setNews(prevNews => prevNews.filter(news => news.id !== newsId));
    }
    return success;
  }, [newsService]);

  // Поиск новостей
  const searchNews = useCallback((query: string): News[] => {
    return newsService.searchNews(query);
  }, [newsService]);

  // Очистка всех новостей
  const clearAllNews = useCallback(() => {
    newsService.clearAllNews();
    setNews([]);
  }, [newsService]);

  return {
    news,
    isLoading,
    addNews,
    updateNews,
    deleteNews,
    searchNews,
    clearAllNews,
    refreshNews: () => setNews(newsService.getAllNews())
  };
}
