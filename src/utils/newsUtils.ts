import type { News, NewsFormData } from '../types/news';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).locale('ru').format('D MMMM YYYY, HH:mm');
};

export const createNews = (data: NewsFormData): News => {
  const now = dayjs().toISOString();
  return {
    id: generateId(),
    ...data,
    createdAt: now,
    updatedAt: now
  };
};

export const updateNews = (news: News, data: Partial<NewsFormData>): News => {
  const now = dayjs().toISOString();
  return {
    ...news,
    ...data,
    updatedAt: now
  };
};

export const getInitialNews = (): News[] => [
  {
    id: '1',
    title: 'Добро пожаловать в новостное приложение!',
    content: 'Это демонстрационная новость. Вы можете добавлять, редактировать и удалять новости.',
    author: 'Система',
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString()
  }
];
