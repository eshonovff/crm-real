// 1. Импорты всех необходимых библиотек и компонентов
import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home, BookOpen, Users, Calendar, Settings, Bell, ChevronDown, ChevronLeft,
  Menu, X, Search, LogOut, Star, DollarSign, FileText, CheckSquare, User,
  MessageCircle, Database, BarChart2, UserCheck, Clock, FileText as File,
  Briefcase, Package, Activity, Building, CreditCard, School, PieChart, Award,
  Mail, Phone, Key, AlertCircle, Send, Coffee, Grid,
} from "lucide-react";
import ThemeToggler from "../components/ThemeToggler/ThemeToggler";

// Основной компонент Layout
const Layout = () => {
  // 2. Определение состояний для управления интерфейсом
  // Сайдбар по умолчанию открыт на десктопе и закрыт на мобильных
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 800);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 800);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasNewNotifications] = useState(true);
  
  // Состояние для раскрывающихся групп меню
  const [expandedMenuGroups, setExpandedMenuGroups] = useState({
    students: true,
    finance: false,
    teaching: false,
    staff: false,
    reports: false,
    settings: false,
  });

  // 3. Настройка поисковой строки с меняющимися плейсхолдерами
  const placeholders = [
    "Поиск...",
    "Найти студента...",
    "Найти курс...",
    "Поиск по системе...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchInputRef = useRef(null);

  // 4. Настройка выбора филиала
  const [selectedBranch, setSelectedBranch] = useState("all");
  const branches = [
    { id: "all", name: "Все филиалы" },
    { id: "dushanbe", name: "Филиал Душанбе" },
    { id: "khujand", name: "Филиал Худжанд" },
    { id: "kulob", name: "Филиал Куляб" },
  ];

  // 5. Получение текущего маршрута и навигации
  const location = useLocation();
  const navigate = useNavigate();

  // 6. Адаптивность интерфейса для различных размеров экрана
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 800);
      
      // Автоматически управляем состоянием сайдбара при изменении размера окна
      if (width < 800 && sidebarOpen) {
        setSidebarOpen(false);
      } else if (width >= 800 && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    // Подписываемся на изменение размера окна
    window.addEventListener("resize", handleResize);
    // Вызываем функцию сразу при монтировании компонента
    handleResize();

    // Отписываемся при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  // 7. Смена плейсхолдера поиска каждые 2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    // Очищаем интервал при размонтировании
    return () => clearInterval(interval);
  }, []);

  // 8. Установка фокуса на поле поиска при его открытии
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // 9. Закрытие сайдбара на мобильных при смене маршрута
  useEffect(() => {
    if (isMobileView) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobileView]);

  // 10. Функции переключения состояний интерфейса
  // Используем функциональное обновление состояния для надежности
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleNotifications = () => setNotificationsOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  
  // Функция для переключения групп меню
  const toggleMenuGroup = (group) => {
    setExpandedMenuGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // 11. Функция выхода из системы
  const handleLogout = () => {
    // Здесь должна быть логика выхода (удаление токена и т.д.)
    navigate("/login");
  };

  // 12. Определение групп меню
  const menuGroups = [
    // Панель управления
    {
      id: "dashboard",
      items: [
        {
          path: "/",
          icon: <PieChart className="w-5 h-5" />,
          label: "Панель управления",
          notification: false,
        },
      ],
    },
    
    // Студенты и обучение
    {
      id: "students",
      label: "Студенты и обучение",
      icon: <School className="w-5 h-5" />,
      items: [
        {
          path: "/students",
          icon: <Users className="w-5 h-5" />,
          label: "Студенты",
          notification: 2,
          submenu: [
            { path: "/students/active", label: "Активные" },
            { path: "/students/inactive", label: "Неактивные" },
            { path: "/students/login", label: "Логины и пароли" },
          ],
        },
        {
          path: "/groups",
          icon: <Grid className="w-5 h-5" />,
          label: "Группы",
          notification: false,
        },
        {
          path: "/journal",
          icon: <BookOpen className="w-5 h-5" />,
          label: "Журнал",
          notification: false,
        },
        {
          path: "/attendance",
          icon: <CheckSquare className="w-5 h-5" />,
          label: "Посещаемость",
          notification: 3,
        },
        {
          path: "/lessons",
          icon: <Calendar className="w-5 h-5" />,
          label: "Расписание",
          notification: false,
        },
      ],
    },
    
    // Финансы
    {
      id: "finance",
      label: "Финансы",
      icon: <DollarSign className="w-5 h-5" />,
      items: [
        {
          path: "/payments",
          icon: <CreditCard className="w-5 h-5" />,
          label: "Платежи студентов",
          notification: 3,
        },
        {
          path: "/subscriptions",
          icon: <CheckSquare className="w-5 h-5" />,
          label: "Абонементы",
          notification: false,
        },
        {
          path: "/accounting",
          icon: <BarChart2 className="w-5 h-5" />,
          label: "Бухгалтерия",
          notification: false,
        },
        {
          path: "/salary",
          icon: <DollarSign className="w-5 h-5" />,
          label: "Зарплаты",
          notification: false,
        },
        {
          path: "/cashier",
          icon: <BarChart2 className="w-5 h-5" />,
          label: "Касса",
          notification: false,
        },
      ],
    },
    
    // Персонал
    {
      id: "staff",
      label: "Персонал",
      icon: <Briefcase className="w-5 h-5" />,
      items: [
        {
          path: "/teachers",
          icon: <UserCheck className="w-5 h-5" />,
          label: "Преподаватели",
          notification: false,
        },
        {
          path: "/staff",
          icon: <Users className="w-5 h-5" />,
          label: "Сотрудники",
          notification: false,
        },
        {
          path: "/workplan",
          icon: <Clock className="w-5 h-5" />,
          label: "Рабочий план",
          notification: false,
        },
        {
          path: "/vacancies",
          icon: <Briefcase className="w-5 h-5" />,
          label: "Вакансии",
          notification: 2,
        },
      ],
    },
    
    // Обучение
    {
      id: "teaching",
      label: "Обучение",
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        {
          path: "/materials",
          icon: <FileText className="w-5 h-5" />,
          label: "Учебные материалы",
          notification: 1,
        },
        {
          path: "/courses",
          icon: <BookOpen className="w-5 h-5" />,
          label: "Курсы",
          notification: false,
        },
        {
          path: "/classroom",
          icon: <School className="w-5 h-5" />,
          label: "Управление классами",
          notification: false,
        },
      ],
    },
    
    // Уведомления и чат
    {
      id: "notifications",
      items: [
        {
          path: "/notifications",
          icon: <Bell className="w-5 h-5" />,
          label: "Уведомления",
          notification: 5,
        },
        {
          path: "/chat",
          icon: <MessageCircle className="w-5 h-5" />,
          label: "Чат",
          notification: 3,
        },
      ],
    },
    
    // Отчеты
    {
      id: "reports",
      label: "Отчеты",
      icon: <File className="w-5 h-5" />,
      items: [
        {
          path: "/statistics",
          icon: <Activity className="w-5 h-5" />,
          label: "Статистика",
          notification: false,
        },
        {
          path: "/reports",
          icon: <FileText className="w-5 h-5" />,
          label: "Отчеты",
          notification: false,
        },
        {
          path: "/export",
          icon: <Send className="w-5 h-5" />,
          label: "Экспорт в Excel",
          notification: false,
        },
      ],
    },
    
    // Настройки
    {
      id: "settings",
      label: "Настройки",
      icon: <Settings className="w-5 h-5" />,
      items: [
        {
          path: "/branches",
          icon: <Building className="w-5 h-5" />,
          label: "Филиалы",
          notification: false,
        },
        {
          path: "/admin",
          icon: <Database className="w-5 h-5" />,
          label: "Администрирование",
          notification: false,
        },
        {
          path: "/system",
          icon: <Settings className="w-5 h-5" />,
          label: "Система",
          notification: false,
        },
      ],
    },
  ];


  // 13. Начало render функции - возвращаем JSX
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
      {/* 14. Header - верхняя панель */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-900 backdrop-blur-md shadow-lg text-white z-30 sticky top-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Логотип и переключатель меню */}
          <div className="flex items-center">
            {/* Кнопка переключения сайдбара - важный элемент для мобильной версии */}
            <button
              onClick={toggleSidebar}
              className="mr-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none text-white"
              aria-label="Переключить меню"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Название системы - скрывается на мобильных */}
            <div className="flex items-center">
              <h1 className="text-base font-bold hidden sm:block text-white tracking-wide">
                СИСТЕМА УПРАВЛЕНИЯ УЧЕБНЫМ ЦЕНТРОМ
              </h1>
            </div>
          </div>

          {/* Правая часть хедера - элементы управления */}
          <div className="flex items-center space-x-4">
            {/* Переключатель темы - для десктопа */}
            <div className="hidden md:flex p-1.5 bg-white/10 dark:bg-indigo-950/40 rounded-lg border border-white/20 dark:border-indigo-400/30 mr-2">
              <ThemeToggler />
            </div>

            {/* Селектор филиала - только десктоп */}
            <div className="hidden md:flex items-center mr-2">
              <span className="text-sm text-white/80 mr-2">Филиал:</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-white/10 dark:bg-indigo-950/40 text-white text-sm py-1.5 px-3 rounded-lg border border-white/20 dark:border-indigo-400/30 focus:outline-none focus:ring-2 focus:ring-white/30 dark:focus:ring-indigo-300/30"
              >
                {branches.map((branch) => (
                  <option
                    className="text-gray-700"
                    key={branch.id}
                    value={branch.id}
                  >
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Кнопки мобильных действий - видны только на мобильных устройствах */}
            <div className="flex items-center space-x-1 md:hidden">
              {/* Переключатель темы для мобильных */}
              <div className="p-1.5 bg-white/10 dark:bg-indigo-950/40 rounded-lg border border-white/20 dark:border-indigo-400/30">
                <ThemeToggler />
              </div>

              {/* Кнопка поиска на мобильных */}
              <button
                className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-indigo-900/50 text-white transition-colors focus:outline-none"
                onClick={toggleSearch}
                aria-label="Поиск"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Поле поиска (десктоп) - скрыто на мобильных */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-white/70" />
              </div>
              <input
                type="search"
                placeholder={placeholders[placeholderIndex]}
                className="w-52 lg:w-64 bg-white/10 dark:bg-indigo-950/40 backdrop-blur-lg border border-white/20 dark:border-indigo-400/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 dark:focus:ring-indigo-300/30 placeholder:text-white/70 text-white transition-all duration-300"
              />
            </div>

            {/* Кнопка уведомлений - доступна на всех устройствах */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-indigo-900/50 text-white transition-colors focus:outline-none relative"
                aria-label="Уведомления"
              >
                <Bell className="w-5 h-5" />
                {/* Индикатор новых уведомлений */}
                {hasNewNotifications && (
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-rose-500 dark:bg-rose-400 border-2 border-indigo-600 dark:border-indigo-800 animate-pulse"></span>
                )}
              </button>
            </div>

            {/* Меню пользователя - современный стеклянный дизайн */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center p-1 rounded-lg hover:bg-white/10 dark:hover:bg-indigo-900/50 focus:outline-none transition-all duration-200"
                aria-label="Меню пользователя"
              >
                <div className="flex items-center ml-2 mr-1 text-left bg-white/10 dark:bg-indigo-950/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 dark:border-indigo-400/30">
                  <div className="bg-indigo-500 dark:bg-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-sm font-medium leading-tight text-white">
                    Администратор
                  </p>
                  <div className="w-2.5 h-2.5 bg-green-400 dark:bg-green-500 rounded-full ml-2 shadow-glow animate-pulse"></div>
                  <ChevronDown className="w-4 h-4 text-white/80 ml-1" />
                </div>
              </button>

              {/* Выпадающее меню пользователя */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl z-20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                  <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Администратор
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      admin@tajsoft.tj
                    </p>
                  </div>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 group"
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    Профиль
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 group"
                  >
                    <Settings className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    Настройки
                  </a>
                  <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-1"></div>
                  <Link to="/login">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2.5 w-full text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 group"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-red-500 dark:text-red-400" />
                      Выйти
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Мобильный оверлей поиска - появляется только на мобильных при нажатии на кнопку поиска */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-indigo-600/90 dark:bg-indigo-800/95 backdrop-blur-xl p-3 md:hidden z-50 shadow-lg border-t border-white/10 dark:border-indigo-400/20">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-white/70" />
              </div>
              <input
                ref={searchInputRef}
                type="search"
                placeholder={placeholders[placeholderIndex]}
                className="w-full bg-white/10 dark:bg-indigo-950/40 border border-white/20 dark:border-indigo-400/30 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 dark:focus:ring-indigo-300/30 text-white"
              />
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleSearch}
                aria-label="Закрыть поиск"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>
          </div>
        )}
      </header>


      {/* 15. Основная часть с сайдбаром и контентом */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Полупрозрачный оверлей для мобильных, когда сайдбар открыт */}
        {isMobileView && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={toggleSidebar}
            aria-label="Закрыть меню"
          ></div>
        )}

        {/* 16. Sidebar - боковое меню */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${
            isMobileView ? "fixed top-16 bottom-0 left-0 w-72" : "w-72"
          } bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black transition-all duration-300 ease-in-out flex flex-col z-20 shadow-xl`}
        >
          {/* Заголовок сайдбара */}
          <div className="px-4 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 text-white">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mr-3 shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-white text-lg">
                  Система управления
                </h2>
                <p className="text-xs text-white/80">Учебным центром</p>
              </div>
            </div>
          </div>

          {/* Содержимое сайдбара - сгруппированное меню */}
          <div className="flex-1 py-4 flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-700">
            {menuGroups.map((group) => (
              <div key={group.id} className="mb-2">
                {/* Заголовок группы меню (если есть) */}
                {group.label && (
                  <button
                    onClick={() => toggleMenuGroup(group.id)}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5 rounded-lg mx-2 transition-all duration-200"
                    aria-expanded={expandedMenuGroups[group.id]}
                    aria-controls={`menu-group-${group.id}`}
                  >
                    <div className="flex items-center">
                      <div className="bg-indigo-500/20 dark:bg-indigo-600/20 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                        {group.icon}
                      </div>
                      <span>{group.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedMenuGroups[group.id] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}

                {/* Пункты меню в группе */}
                <div
                  id={`menu-group-${group.id}`}
                  className={`mt-1 space-y-1 ${
                    group.label && !expandedMenuGroups[group.id] ? "hidden" : ""
                  }`}
                >
                  {group.items.map((item) => (
                    <div key={item.path}>
                      {/* Пункт меню */}
                      <Link
                        to={item.path}
                        onClick={() => isMobileView && setSidebarOpen(false)}
                        className={`flex items-center px-4 py-2.5 mx-2 rounded-lg ${
                          location.pathname === item.path
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 text-white shadow-md"
                            : "text-gray-300 hover:bg-white/5 dark:hover:bg-white/5"
                        } transition-all duration-200 relative group`}
                        aria-current={location.pathname === item.path ? "page" : undefined}
                      >
                        <span
                          className={`${
                            location.pathname === item.path
                              ? "bg-white/20 text-white"
                              : "bg-gray-800 dark:bg-gray-900 text-gray-400 group-hover:bg-gray-700 dark:group-hover:bg-gray-800 group-hover:text-gray-200"
                          } w-7 h-7 flex items-center justify-center rounded-lg mr-3 transition-all`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-sm">{item.label}</span>

                        {/* Индикатор уведомлений */}
                        {item.notification > 0 && (
                          <span className="ml-auto bg-indigo-500 dark:bg-indigo-600 text-white text-xs font-bold min-w-5 h-5 flex items-center justify-center rounded-full px-1">
                            {item.notification}
                          </span>
                        )}
                      </Link>

                      {/* Подменю, если есть */}
                      {item.submenu &&
                        item.submenu.length > 0 &&
                        location.pathname.startsWith(item.path) && (
                          <div className="pl-12 space-y-1 mt-1">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`block px-3 py-2 text-sm rounded-lg ${
                                  location.pathname === subItem.path
                                    ? "bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-400 dark:text-indigo-300 font-medium"
                                    : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
                                } transition-all duration-200`}
                                aria-current={location.pathname === subItem.path ? "page" : undefined}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Футер сайдбара */}
          <div className="p-4 border-t border-gray-700/50 dark:border-gray-800/50">
            <Link
              to="/exit"
              onClick={handleLogout}
              className="flex items-center justify-center w-full py-2.5 bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-pink-700 transition-all duration-300 shadow-md"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выход
            </Link>
            <div className="mt-4 pt-3 border-t border-gray-700/50 dark:border-gray-800/50 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Copyright © 2025 Developed by
              </p>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-300">
                TAJSOFT.TJ
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                All rights reserved.
              </p>
            </div>
          </div>
        </aside>



        {/* 17. Основное содержимое */}
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-gray-900 p-4">
          <Outlet />
        </main>

        {/* 18. Панель уведомлений - отображается при клике на колокольчик */}
        {notificationsOpen && (
          <div className="fixed inset-y-0 right-0 w-96 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl z-50 transition-all duration-300 transform border-l border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <h2 className="font-bold text-lg">Уведомления</h2>
              <button
                onClick={toggleNotifications}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white focus:outline-none transition-all duration-200"
                aria-label="Закрыть уведомления"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-screen">
              {hasNewNotifications ? (
                <div className="space-y-4">
                  {/* Уведомление о дне рождения */}
                  <div className="p-4 rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-pink-100 dark:bg-pink-900/30 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                          <Award className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-pink-800 dark:text-pink-400">
                          День рождения студента
                        </h3>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-pink-500 animate-pulse"></span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 pl-11">
                      Сегодня день рождения у студента Алишер Каримов
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center pl-11">
                      <span>Сегодня, 14 мая</span>
                    </div>
                  </div>

                  {/* Уведомление о платеже */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-amber-100 dark:bg-amber-900/30 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                          <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                          Ожидается платеж
                        </h3>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 pl-11">
                      Студент Сорбон Джураев должен оплатить 250₽ до 13 мая
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center pl-11">
                      <span>Осталось 3 дня</span>
                    </div>
                  </div>

                  {/* Уведомление о пропуске */}
                  <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-red-100 dark:bg-red-900/30 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-red-800 dark:text-red-400">
                          Пропуск занятия
                        </h3>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 pl-11">
                      Студент Фирдавс Назаров пропустил занятие вчера
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center pl-11">
                      <span>Вчера, 15:30</span>
                    </div>
                  </div>

                  {/* Уведомление о новом студенте */}
                  <div className="p-4 rounded-xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-900/20 dark:to-gray-800/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-cyan-100 dark:bg-cyan-900/30 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-cyan-800 dark:text-cyan-400">
                          Новый студент зарегистрирован
                        </h3>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 pl-11">
                      Мадина Касымова записалась на курс "Математика"
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center pl-11">
                      <span>3 часа назад</span>
                    </div>
                  </div>

                  {/* Уведомление о зарплате */}
                  <div className="p-4 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                          <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-green-800 dark:text-green-400">
                          Выплата зарплаты
                        </h3>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 pl-11">
                      Выплата зарплаты состоится 15 мая
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center pl-11">
                      <span>Через 2 дня</span>
                    </div>
                  </div>

                  {/* Кнопка просмотра всех уведомлений */}
                  <Link
                    to="/notifications"
                    onClick={toggleNotifications}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium block w-full text-center mt-6 py-2 border border-indigo-200 dark:border-indigo-800/50 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-all duration-200"
                  >
                    Просмотреть все уведомления
                  </Link>
                </div>
              ) : (
                <div className="text-center py-16 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Нет новых уведомлений
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 19. Экспорт компонента
export default Layout;

/* 20. Улучшенные стили темной темы */
<style jsx global>{`
  /* Основные настройки темной темы */
  .dark {
    color-scheme: dark;
  }

  /* Базовые цвета темной темы */
  .dark body {
    background-color: #0f172a;
    color: #e2e8f0;
  }

  /* Градиент заголовка для темной темы */
  .dark .header-gradient {
    background-image: linear-gradient(to right, #3730a3, #6b21a8);
  }

  /* Градиент сайдбара для темной темы */
  .dark .sidebar-gradient {
    background-image: linear-gradient(to bottom, #1e293b, #0f172a);
  }

  /* Улучшенный эффект стекла (glass morphism) для элементов темной темы */
  .dark .glass-effect {
    background-color: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(99, 102, 241, 0.2);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }

  /* Переопределение цветов и другие улучшения для темной темы */
  .dark .bg-indigo-600 {
    background-color: #4338ca;
  }

  .dark .bg-purple-600 {
    background-color: #7e22ce;
  }

  .dark .from-indigo-600 {
    --tw-gradient-from: #4338ca;
  }

  .dark .to-purple-600 {
    --tw-gradient-to: #7e22ce;
  }

  /* Улучшенная анимация пульсации для темной темы */
  @keyframes dark-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .dark .animate-pulse {
    animation: dark-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Улучшенный эффект свечения для темной темы */
  .dark .shadow-glow {
    box-shadow: 0 0 12px rgba(74, 222, 128, 0.6);
  }

  /* Улучшенные состояния наведения для темной темы */
  .dark .hover-effect:hover {
    background-color: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
    border-color: rgba(99, 102, 241, 0.4);
  }

  /* Тонкие скроллбары для темной темы */
  .dark ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .dark ::-webkit-scrollbar-track {
    background-color: rgba(15, 23, 42, 0.3);
    border-radius: 10px;
  }

  .dark ::-webkit-scrollbar-thumb {
    background-color: rgba(99, 102, 241, 0.3);
    border-radius: 10px;
  }

  .dark ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(99, 102, 241, 0.5);
  }

  /* Улучшенная анимация при переключении темы */
  html {
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Улучшенное фокусное состояние для темной темы */
  .dark *:focus-visible {
    outline: 2px solid rgba(99, 102, 241, 0.6);
    outline-offset: 2px;
  }

  /* Улучшенные стили для полей ввода в темной теме */
  .dark input,
  .dark select,
  .dark textarea {
    background-color: rgba(30, 41, 59, 0.8);
    border-color: rgba(99, 102, 241, 0.3);
    color: #e2e8f0;
  }

  .dark input::placeholder,
  .dark textarea::placeholder {
    color: rgba(148, 163, 184, 0.7);
  }

  /* Стили для активного состояния элементов в темной теме */
  .dark .active-item {
    background: linear-gradient(
      to right,
      rgba(79, 70, 229, 0.8),
      rgba(124, 58, 237, 0.8)
    );
    color: white;
    border-color: rgba(99, 102, 241, 0.5);
  }
`}</style>