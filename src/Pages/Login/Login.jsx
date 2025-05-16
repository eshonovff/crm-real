import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  User, Lock, Eye, EyeOff, LogIn, CheckCircle, AlertTriangle
} from 'lucide-react';

// Импортируем логотипы
import blackLogo from "../../assets/kavsar.png";
import whiteLogo from "../../assets/logo2.png";

// Анимация для Lottie
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/Animation - 1747319314936.json'; // Анимация для входа

// Импортируем действие для авторизации
import { Login as LoginAction } from '../../Api/LoginApi';

const Login = () => {
  // Состояния для управления формой
  const [showPassword, setShowPassword] = useState(false); // показать/скрыть пароль
  const [rememberMe, setRememberMe] = useState(false); // запомнить пользователя
  const [loading, setLoading] = useState(false); // состояние загрузки
  const [error, setError] = useState(''); // сообщение об ошибке
  const [success, setSuccess] = useState(''); // сообщение об успешной операции
  const [isDarkMode, setIsDarkMode] = useState(false); // для определения темного режима

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Определяем логотип в зависимости от темы
  const logo = isDarkMode ? whiteLogo : blackLogo;

  // Проверка темного режима
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Состояния для полей формы
  const [loginData, setLoginData] = useState({
    username: 'admin1234',
    password: 'Qwerty123!',
  });

  // Обработчики изменений полей
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    setError(''); // очищаем ошибку при изменении полей
  };

  // Обработчик переключения видимости пароля
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Обработчик входа с использованием Redux Thunk действия
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Простая валидация
    if (!loginData.username || !loginData.password) {
      setError('Пожалуйста, заполните все поля');
      setLoading(false);
      return;
    }

    // Используем Redux Thunk действие для входа
    dispatch(LoginAction({
      login: {
        username: loginData.username,
        password: loginData.password
      },
      navigate
    }))
    .unwrap()
    .then(() => {
      setSuccess('Вход выполнен успешно!');
      setLoading(false);
    })
    .catch((error) => {
      setError(error || 'Ошибка при входе');
      setLoading(false);
    });
    
    // Здесь должен быть API-запрос для входа
    setTimeout(() => {
      // Имитируем задержку API-запроса
      // В реальном проекте здесь будет запрос к API
      setLoading(false);
      
      // Для демонстрации - успешный вход и перенаправление
      navigate('/');  // ВОТ ЭТА СТРОКА ПЕРЕНАПРАВЛЯЕТ НА ДАШБОРД
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Левая сторона - форма входа */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
            {/* Логотип компании */}
            <div className="mb-6 flex justify-center">
              <img 
                src={logo} 
                alt="Kavsar Logo" 
                className="h-16 object-contain"
              />
            </div>

            {/* Заголовок */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-2">
              Вход в систему
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
              Войдите для доступа к системе управления учебным центром
            </p>

            {/* Сообщения об ошибках или успешных операциях */}
            {error && (
              <div className="mb-4 w-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-start">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 w-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}

            {/* Форма входа */}
            <form onSubmit={handleLogin} className="w-full space-y-4">
              {/* Поле имени пользователя */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Имя пользователя
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={loginData.username}
                    onChange={handleLoginChange}
                    className="block w-full pl-11 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                    placeholder="Введите имя пользователя"
                  />
                </div>
              </div>

              {/* Пароль поле */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Пароль
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="block w-full pl-11 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              {/* Запомнить меня и ссылка для восстановления пароля */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Запомнить меня
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                    Забыли пароль?
                  </a>
                </div>
              </div>

              {/* Кнопка входа */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 px-4 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading
                    ? 'bg-indigo-400 dark:bg-indigo-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-500 hover:to-purple-500 dark:hover:from-indigo-400 dark:hover:to-purple-400 shadow-md hover:shadow-lg transition-all duration-200'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Вход...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Войти
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Правая сторона с анимацией */}
          <div className="hidden md:flex md:w-1/2 p-6 bg-gradient-to-br from-indigo-500 to-purple-600 transition-all duration-500 justify-center items-center">
            <div className="max-w-md">
              {/* Анимация входа */}
              <div className="text-center">
                <Lottie 
                  animationData={loginAnimation} 
                  className="w-full h-60 mb-4"
                />
                <h2 className="text-2xl font-bold text-white mb-2">Добро пожаловать!</h2>
                <p className="text-white/80">
                  Войдите в систему, чтобы получить доступ к управлению учебным центром
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 KAVSAR ACADEMY | Система управления учебным центром
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Условия использования
            </a>
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Поддержка
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;