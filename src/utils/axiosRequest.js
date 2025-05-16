import axios from "axios";
import { getToken, isTokenExpired, destroyToken } from "./token"; // Импортируем функции для работы с токенами

// Создаем экземпляр axios с базовым URL из переменных окружения
export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
});

// Добавляем перехватчик запросов
axiosRequest.interceptors.request.use((config) => {
    // Получаем токен из localStorage
    const token = getToken();
    
    // Проверяем, не истек ли токен
    if (token && !isTokenExpired()) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (token && isTokenExpired()) {
        // Если токен истек, удаляем его
        console.warn("Токен истек, удаляем данные авторизации");
        destroyToken();
        // Можно добавить логику для перенаправления на страницу входа здесь
        window.location.href = '/login';
    }
    
    return config;
}, (error) => {
    // В случае ошибки в запросе, отклоняем Promise с ошибкой
    return Promise.reject(error);
});

// Добавляем перехватчик ответов для обработки ошибок авторизации
axiosRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        // Если сервер вернул ошибку 401 (Unauthorized) или 403 (Forbidden)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn("Ошибка авторизации, удаляем данные авторизации");
            destroyToken();
            // Перенаправляем на страницу входа
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosRequest;