// src/components/ProtectedRoute.js или путь, где хранится этот файл
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { hasToken, isTokenExpired } from '../utils/token'; // Убедитесь, что путь импорта правильный

/**
 * Компонент для защиты маршрутов, требующих авторизации
 */
const ProtectedRoute = ({ redirectPath = '/login' }) => {
  console.log("ProtectedRoute: Проверка аутентификации");
  console.log("hasToken:", hasToken());
  console.log("isTokenExpired:", isTokenExpired());
  
  const isAuthenticated = hasToken() && !isTokenExpired();

  if (!isAuthenticated) {
    console.log("ProtectedRoute: Перенаправление на", redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  console.log("ProtectedRoute: Пользователь аутентифицирован, отображаем содержимое");
  return <Outlet />;
};
/*************  ✨ Windsurf Command 🌟  *************/

/**
 * 
 * Он проверяет, является ли пользователь аутентифицированным.
 * Если пользователь аутентифицирован, то он будет перенаправлен на redirectPath.
 * Если пользователь не аутентифицирован, то он будет иметь доступ к
 * маршрутам, определенным в children.
 * 
 * @param {object} props - объект props, содержащий redirectPath
 * @param {string} [props.redirectPath='/'] - путь, на который будет
 *                                            перенаправлен пользователь, если
 *                                            он аутентифицирован
 * @returns {ReactElement} - компонент React, который будет отображаться
 *                           на странице
 * Компонент для доступа к маршрутам только для гостей
 */
export const GuestRoute = ({ redirectPath = '/' }) => {
  const isAuthenticated = hasToken() && !isTokenExpired();

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
/*******  a376cfad-77b4-475f-bff9-8bf1f74ddd1e  *******/
};

/**
 * Компонент для защиты маршрутов на основе роли
 */
export const RoleBasedRoute = ({ allowedRole, redirectPath = '/' }) => {
  const isAuthenticated = hasToken() && !isTokenExpired();
  
  const userRole = localStorage.getItem('role');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;