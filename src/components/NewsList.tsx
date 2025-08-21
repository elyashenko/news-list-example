import { useState, useMemo } from 'react';
import type { News, NewsFormData } from '../types/news';
import { NewsCard } from './NewsCard';
import { NewsForm } from './NewsForm';
import { CustomSelect } from './CustomSelect';


interface NewsListProps {
  news: News[];
  onAddNews: (newsData: NewsFormData) => News;
  onUpdateNews: (newsId: string, newsData: Partial<NewsFormData>) => boolean;
  onDeleteNews: (newsId: string) => boolean;
}

export const NewsList: React.FC<NewsListProps> = ({ news, onAddNews, onUpdateNews, onDeleteNews }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'author'>('date');

  const filteredAndSortedNews = useMemo(() => {
    const filtered = news.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });
  }, [news, searchTerm, sortBy]);

  const handleAddNews = () => {
    setEditingNews(undefined);
    setShowForm(true);
  };

  const handleEditNews = (newsItem: News) => {
    setEditingNews(newsItem);
    setShowForm(true);
  };

  const handleDeleteNews = (id: string) => {
    onDeleteNews(id);
  };

  const handleSubmitForm = (data: NewsFormData) => {
    if (editingNews) {
      onUpdateNews(editingNews.id, data);
    } else {
      onAddNews(data);
    }
    setShowForm(false);
    setEditingNews(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNews(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Управление новостями</h1>
          <p className="text-gray-600 text-sm mt-1">Добавляйте, редактируйте и управляйте новостями</p>
        </div>
        <button
          onClick={handleAddNews}
          className="btn btn-primary cursor-pointer"
        >
          + Добавить новость
        </button>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col xs:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Поиск
          </label>
          <input
            id="search"
            type="text"
            placeholder="По заголовку, содержанию или автору..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input max-w-full"
          />
        </div>
        <div className="w-full xs:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сортировка
          </label>
          <CustomSelect
            value={sortBy}
            onChange={(value) => setSortBy(value as 'date' | 'title' | 'author')}
            options={[
              { value: 'date', label: 'По дате' },
              { value: 'title', label: 'По заголовку' },
              { value: 'author', label: 'По автору' }
            ]}
            placeholder="Выберите сортировку"
          />
        </div>
      </div>

      {/* News Count */}
      <div className="text-sm text-gray-600">
        Найдено новостей: {filteredAndSortedNews.length} из {news.length}
      </div>

      {/* News List */}
      {filteredAndSortedNews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'По вашему запросу ничего не найдено' : 'Новостей пока нет'}
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddNews}
              className="btn btn-primary mt-4 cursor-pointer"
            >
              Добавить первую новость
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredAndSortedNews.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              news={newsItem}
              onEdit={handleEditNews}
              onDelete={handleDeleteNews}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <NewsForm
          news={editingNews}
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};
