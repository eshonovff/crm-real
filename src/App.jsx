import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout/Layout';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import ProtectedRoute, { GuestRoute } from './utils/ProtectedRoute'; // Убедитесь, что путь к импорту правильный

// Компоненты-заглушки для страниц
const PageTemplate = ({ title }) => (
  <div className="min-h-screen bg-white rounded-lg shadow-sm p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
    <p className="text-gray-600">Эта страница находится в разработке.</p>
  </div>
);

// Студенты и подстраницы
const Students = () => <Outlet />;
const StudentList = () => <PageTemplate title="Список всех студентов" />;
const StudentActive = () => <PageTemplate title="Активные студенты" />;
const StudentInactive = () => <PageTemplate title="Неактивные студенты" />;
const StudentLogins = () => <PageTemplate title="Логины и пароли студентов" />;

// Группы
const Groups = () => <PageTemplate title="Группы" />;
const Journal = () => <PageTemplate title="Журнал" />;
const Attendance = () => <PageTemplate title="Посещаемость" />;
const Schedule = () => <PageTemplate title="Расписание занятий" />;

// Финансы
const Payments = () => <PageTemplate title="Платежи студентов" />;
const Subscriptions = () => <PageTemplate title="Абонементы" />;
const Accounting = () => <PageTemplate title="Бухгалтерия" />;
const Salary = () => <PageTemplate title="Зарплаты" />;
const Cashier = () => <PageTemplate title="Касса" />;

// Персонал
const Teachers = () => <PageTemplate title="Преподаватели" />;
const StaffPage = () => <PageTemplate title="Сотрудники" />;
const WorkPlan = () => <PageTemplate title="Рабочий план" />;
const Vacancies = () => <PageTemplate title="Вакансии" />;

// Обучение
const Materials = () => <PageTemplate title="Учебные материалы" />;
const Courses = () => <PageTemplate title="Курсы" />;
const Classroom = () => <PageTemplate title="Управление классами" />;

// Уведомления
const Notifications = () => <PageTemplate title="Уведомления" />;
const Chat = () => <PageTemplate title="Чат" />;

// Отчеты
const Statistics = () => <PageTemplate title="Статистика" />;
const Reports = () => <PageTemplate title="Отчеты" />;
const ExportPage = () => <PageTemplate title="Экспорт в Excel" />;

// Настройки
const Branches = () => <PageTemplate title="Филиалы" />;
const Admin = () => <PageTemplate title="Администрирование" />;
const SystemSettings = () => <PageTemplate title="Настройки системы" />;

// Забыли пароль
const ForgotPassword = () => <PageTemplate title="Восстановление пароля" />;

// Ошибки
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Страница не найдена</h2>
      <p className="text-gray-600 mb-4">Запрашиваемая страница не существует.</p>
      <a href="/" className="text-blue-600 hover:underline">Вернуться на главную</a>
    </div>
  </div>
);

const App = () => {
  const router = createBrowserRouter([
    // Маршруты для гостей (неавторизованные пользователи)
    {
      element: <GuestRoute redirectPath="/" />,
      children: [
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />
        }
      ]
    },
    
    // Защищенные маршруты (требуют авторизации)
    {
      element: <ProtectedRoute redirectPath="/login" />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            
            // Студенты
            {
              path: "students",
              element: <Students />,
              children: [
                {
                  index: true,
                  element: <StudentList />,
                },
                {
                  path: "active",
                  element: <StudentActive />,
                },
                {
                  path: "inactive",
                  element: <StudentInactive />,
                },
                {
                  path: "login",
                  element: <StudentLogins />,
                }
              ]
            },
            
            // Группы
            {
              path: "groups",
              element: <Groups />,
            },
            
            // Журнал
            {
              path: "journal",
              element: <Journal />,
            },
            
            // Посещаемость
            {
              path: "attendance",
              element: <Attendance />,
            },
            
            // Расписание
            {
              path: "lessons",
              element: <Schedule />,
            },
            
            // Финансы
            {
              path: "payments",
              element: <Payments />,
            },
            {
              path: "subscriptions",
              element: <Subscriptions />,
            },
            {
              path: "accounting",
              element: <Accounting />,
            },
            {
              path: "salary",
              element: <Salary />,
            },
            {
              path: "cashier",
              element: <Cashier />,
            },
            
            // Персонал
            {
              path: "teachers",
              element: <Teachers />,
            },
            {
              path: "staff",
              element: <StaffPage />,
            },
            {
              path: "workplan",
              element: <WorkPlan />,
            },
            {
              path: "vacancies",
              element: <Vacancies />,
            },
            
            // Обучение
            {
              path: "materials",
              element: <Materials />,
            },
            {
              path: "courses",
              element: <Courses />,
            },
            {
              path: "classroom",
              element: <Classroom />,
            },
            
            // Уведомления
            {
              path: "notifications",
              element: <Notifications />,
            },
            {
              path: "chat",
              element: <Chat />,
            },
            
            // Отчеты
            {
              path: "statistics",
              element: <Statistics />,
            },
            {
              path: "reports",
              element: <Reports />,
            },
            {
              path: "export",
              element: <ExportPage />,
            },
            
            // Настройки
            {
              path: "branches",
              element: <Branches />,
            },
            {
              path: "admin",
              element: <Admin />,
            },
            {
              path: "system",
              element: <SystemSettings />,
            }
          ]
        }
      ]
    },
    
    // Маршрут для всех остальных путей
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;