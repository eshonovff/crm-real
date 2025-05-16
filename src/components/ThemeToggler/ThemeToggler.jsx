import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggler = () => {
  // Определяем состояние темы
  const [darkMode, setDarkMode] = useState(() => {
    // Проверяем сохраненную тему в локальном хранилище
    const savedTheme = localStorage.getItem('theme');
    // Проверяем системные настройки 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Возвращаем true, если в хранилище есть 'dark' или система предпочитает темную тему
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  // Применяем тему при загрузке и при изменении
  useEffect(() => {
    // Применяем класс 'dark' к html элементу при темной теме
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Сохраняем выбор в localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Функция переключения темы
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={darkMode ? 'Включить светлую тему' : 'Включить темную тему'}
      className="relative rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 group"
      title={darkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      {darkMode ? (
        <div className="flex items-center justify-center text-white/90 dark:text-yellow-300/90 transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:text-yellow-300 dark:group-hover:text-yellow-200">
          <Sun className="w-5 h-5" />
        </div>
      ) : (
        <div className="flex items-center justify-center text-white/90 transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:text-indigo-200">
          <Moon className="w-5 h-5" />
        </div>
      )}
    </button>
  );
};

export default ThemeToggler;