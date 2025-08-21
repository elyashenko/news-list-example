import type { News } from '../types/news';
import { formatDate } from '../utils/newsUtils';

interface NewsCardProps {
  news: News;
  onEdit: (news: News) => void;
  onDelete: (id: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      onDelete(news.id);
    }
  };

  return (
    <div className="card p-4 hover:shadow-md transition-shadow duration-200 cursor-default">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-3">
          {news.title}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(news)}
            className="btn btn-secondary text-sm px-3 py-1 cursor-pointer"
            aria-label="Редактировать"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger text-sm px-3 py-1 cursor-pointer"
            aria-label="Удалить"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {news.content}
      </p>
      
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 text-xs text-gray-500">
        <span className="font-medium">Автор: {news.author}</span>
        <div className="flex flex-col xs:items-end">
          <span>Создано: {formatDate(news.createdAt)}</span>
          {news.updatedAt !== news.createdAt && (
            <span>Обновлено: {formatDate(news.updatedAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
};
