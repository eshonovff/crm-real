import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Users, Calendar, Settings, Bell, ChevronDown, ChevronLeft, Menu, X, Search, LogOut, Star, Palette } from 'lucide-react';

const Layout = () => {
  // Состояния для управления интерфейсом
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 800);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 800);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  
  // Placeholder для поиска
  const placeholders = ["Поиск...", "Найти студента...", "Найти курс...", "Поиск по системе..."];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchInputRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Имитация проверки уведомлений
  useEffect(() => {
    // Допустим, что у нас есть новые уведомления
    setHasNewNotifications(true);
  }, []);

  // Адаптивность для разных размеров экрана
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 800);
      if (width < 800 && sidebarOpen) {
        setSidebarOpen(false);
      } else if (width >= 800 && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  // Смена плейсхолдера поиска
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Фокус на поиске при открытии
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Закрытие сайдбара на мобильных при смене маршрута
  useEffect(() => {
    if (isMobileView) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobileView]);

  // Функции переключения элементов интерфейса
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Выход из системы
  const handleLogout = () => {
    // Здесь должна быть логика выхода (удаление токена и т.д.)
    navigate('/login');
  };

  // Пункты меню
  const menuItems = [
    { 
      path: "/", 
      icon: <Home className="w-5 h-5" />, 
      label: "Главная", 
      description: "Обзор панели управления" 
    },
    { 
      path: "/students", 
      icon: <Users className="w-5 h-5" />, 
      label: "Студенты", 
      description: "Управление студентами",
      notification: false
    },
    { 
      path: "/courses", 
      icon: <BookOpen className="w-5 h-5" />, 
      label: "Курсы", 
      description: "Управление курсами" 
    },
    { 
      path: "/schedule", 
      icon: <Calendar className="w-5 h-5" />, 
      label: "Расписание", 
      description: "Управление расписанием" 
    },
    { 
      path: "/reviews", 
      icon: <Star className="w-5 h-5" />, 
      label: "Отзывы", 
      description: "Управление отзывами" 
    },
    { 
      path: "/settings", 
      icon: <Settings className="w-5 h-5" />, 
      label: "Настройки", 
      description: "Настройки системы" 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm text-gray-800 z-30 sticky top-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo and menu toggle */}
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="mr-3 p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-600"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg mr-2">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold hidden sm:block text-gray-800">
                Учебный Центр
              </h1>
            </div>
          </div>

          {/* Search and User */}
          <div className="flex items-center space-x-3">
            {/* Search button on mobile */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Search Input (Desktop) */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder={placeholders[placeholderIndex]}
                className="w-48 lg:w-64 bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 transition-all duration-300"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {hasNewNotifications && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 border-2 border-white"></span>
                )}
              </button>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center p-1 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                  А
                </div>
                <div className="hidden sm:block ml-2 mr-1 text-left">
                  <p className="text-sm font-medium leading-tight">Админ</p>
                  <p className="text-xs text-gray-500">Супер админ</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-lg shadow-lg z-20 border border-gray-100">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                    Профиль
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                    Настройки
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-3 md:hidden z-50 shadow-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="search"
                placeholder={placeholders[placeholderIndex]}
                className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleSearch}
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay for mobile when sidebar is open */}
        {isMobileView && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${
            isMobileView ? 'fixed top-16 bottom-0 left-0 w-64' : 'w-64'
          } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-sm z-20`}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Панель управления</h2>
            {!isMobileView && (
              <button 
                onClick={toggleSidebar}
                className="p-1 rounded hover:bg-gray-100 text-gray-500 focus:outline-none"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sidebar content */}
          <div className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobileView && setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg ${
                  location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-all duration-200 relative group`}
              >
                <span className={`${
                  location.pathname === item.path ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-500'
                }`}>
                  {item.icon}
                </span>
                <div className="ml-3 flex flex-col">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.description}</span>
                </div>
                
                {/* Индикатор уведомлений */}
                {item.notification && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-800 mb-1">Нужна помощь?</h3>
              <p className="text-xs text-gray-600 mb-3">Свяжитесь с нашей службой поддержки</p>
              <button className="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                Связаться
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 transition-all ${isMobileView && sidebarOpen ? 'blur-sm' : ''}`}>
          <Outlet />
        </main>

        {/* Notifications panel */}
        {notificationsOpen && (
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 transition-all duration-300 transform border-l border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Уведомления</h2>
              <button 
                onClick={toggleNotifications}
                className="p-1 rounded hover:bg-gray-100 text-gray-500 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              {hasNewNotifications ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border bg-indigo-50 border-indigo-100">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium text-indigo-700">
                        Новый студент зарегистрирован
                      </h3>
                      <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Алексей Смирнов зарегистрировался на курс "Веб-разработка"
                    </p>
                    <div className="text-xs text-gray-500 flex items-center">
                      <span>10 минут назад</span>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border bg-indigo-50 border-indigo-100">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium text-indigo-700">
                        Новый отзыв получен
                      </h3>
                      <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Екатерина оставила отзыв о курсе "Маркетинг"
                    </p>
                    <div className="text-xs text-gray-500 flex items-center">
                      <span>2 часа назад</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/notifications"
                    onClick={toggleNotifications}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium block w-full text-center mt-4"
                  >
                    Просмотреть все уведомления
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p>Нет новых уведомлений</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;