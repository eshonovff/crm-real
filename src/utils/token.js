// src/utils/token.js

/**
 * Сохраняет данные аутентификации в localStorage
 * @param {Object} data - Данные аутентификации (токен, информация о пользователе и т.д.)
 */
export const saveToken = (data) => {
  try {
    // Логирование для отладки
    console.log("Сохраняем токен:", data);
    
    // Сохраняем токен доступа - обратите внимание на структуру данных
    localStorage.setItem('token', data.token || data.accessToken || data.jwt || data);
    
    // Если в ответе есть refresh token, сохраняем и его
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    
    // Если есть информация о пользователе, сохраняем ее
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    // Если есть роль пользователя
    if (data.role) {
      localStorage.setItem('role', data.role);
    }
    
    // Если есть срок действия токена
    if (data.expiresIn) {
      const expirationTime = new Date().getTime() + data.expiresIn * 1000;
      localStorage.setItem('tokenExpiration', expirationTime.toString());
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении токена:', error);
    return false;
  }
};

/**
 * Удаляет все данные аутентификации из localStorage
 */
export const destroyToken = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('tokenExpiration');
    return true;
  } catch (error) {
    console.error('Ошибка при удалении токена:', error);
    return false;
  }
};

/**
 * Проверяет наличие токена в localStorage
 * @returns {boolean} Есть ли токен
 */
export const hasToken = () => {
  return !!localStorage.getItem('token');
};

/**
 * Получает токен из localStorage
 * @returns {string|null} Токен или null, если токен не найден
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Получает информацию о пользователе из localStorage
 * @returns {Object|null} Объект с информацией о пользователе или null
 */
export const getUser = () => {
  const userString = localStorage.getItem('user');
  try {
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Ошибка при парсинге данных пользователя:', error);
    return null;
  }
};

/**
 * Проверяет, истек ли срок действия токена
 * @returns {boolean} Истек ли срок действия токена
 */
export const isTokenExpired = () => {
  const expiration = localStorage.getItem('tokenExpiration');
  if (!expiration) return false; // Если нет срока действия, считаем, что токен не истек
  
  return new Date().getTime() > parseInt(expiration);
};

/**
 * Получает роль пользователя
 * @returns {string|null} Роль пользователя или null
 */
export const getUserRole = () => {
  return localStorage.getItem('role');
};

/**
 * Обновляет только токен без изменения других данных
 * @param {string} newToken Новый токен
 */
export const updateToken = (newToken) => {
  if (newToken) {
    localStorage.setItem('token', newToken);
    return true;
  }
  return false;
};