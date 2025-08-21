import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          {/* Основная информация */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">📰 Новостное приложение</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Демонстрационное CRUD приложение, созданное для изучения современных веб-технологий
            </p>
          </div>

          {/* Технологии */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3">🛠️ Используемые технологии</h4>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-blue-600 px-3 py-1 rounded-full">React 19</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">TypeScript</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">Vite</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">Tailwind CSS 4</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">LocalStorage</span>
            </div>
          </div>

          {/* Возможности */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3">✨ Возможности</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <span>📝 Добавление новостей</span>
              <span>✏️ Редактирование</span>
              <span>🗑️ Удаление</span>
              <span>🔍 Поиск</span>
              <span>📱 Адаптивный дизайн</span>
            </div>
          </div>

          {/* Разделитель */}
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              © {currentYear} Демонстрационное приложение. Создано в образовательных целях.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Все данные хранятся локально в браузере и не передаются на сервер.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
