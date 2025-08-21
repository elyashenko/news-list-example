import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const Header: React.FC = () => {
  const currentDate = dayjs().locale('ru').format('dddd, D MMMM YYYY');

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Логотип и название */}
          <div className="flex items-center space-x-3">
            {/* Анимированный логотип */}
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-2xl">📰</span>
              </div>
              {/* Внешнее свечение */}
              <div className="absolute inset-0 w-12 h-12 bg-white rounded-full opacity-20 animate-ping"></div>
            </div>
            
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                News<span className="text-yellow-300">Hub</span>
              </h1>
              <p className="text-blue-100 text-xs lg:text-sm">
                Ваш источник актуальных новостей
              </p>
            </div>
          </div>

          {/* Информация справа */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 text-center lg:text-right">
            {/* Статистика и дата в одной линии */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
                <div className="text-lg font-bold text-yellow-300">24/7</div>
                <div className="text-xs text-blue-200">Обновления</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
                <div className="text-lg font-bold text-yellow-300">100%</div>
                <div className="text-xs text-blue-200">Качество</div>
              </div>
              
              {/* Текущая дата - компактный прямоугольник справа */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[120px] text-center">
                <div className="text-xs text-blue-200 uppercase tracking-wide">Сегодня</div>
                <div className="font-medium text-xs truncate">{currentDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная навигация */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Система работает</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Демо версия</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>LocalStorage</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
