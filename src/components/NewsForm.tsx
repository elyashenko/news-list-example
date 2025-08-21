import { useState, useEffect } from 'react';
import type { News, NewsFormData } from '../types/news';

interface NewsFormProps {
  news?: News;
  onSubmit: (data: NewsFormData) => void;
  onCancel: () => void;
}

export const NewsForm: React.FC<NewsFormProps> = ({ news, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    content: '',
    author: ''
  });

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        content: news.content,
        author: news.author
      });
    }
  }, [news]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim() && formData.author.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {news ? 'Редактировать новость' : 'Добавить новость'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input max-w-full"
                placeholder="Введите заголовок новости"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Содержание *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="input min-h-[120px] resize-none break-words"
                placeholder="Введите содержание новости"
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Автор *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="input max-w-full"
                placeholder="Введите имя автора"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn btn-primary flex-1 cursor-pointer"
              >
                {news ? 'Сохранить' : 'Добавить'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary flex-1 cursor-pointer"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
