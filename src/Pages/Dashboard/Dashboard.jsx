import { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  BookOpen, 
  Calendar, 
  Star, 
  Users, 
  DollarSign, 
  AlertCircle, 
  Gift, 
  FileText, 
  ArrowUp,
  ArrowDown,
  Loader
} from 'lucide-react';
import StatCard from '../../components/DasboardComp/StatCard';

// Компоненты статистических карточек


// Компонент диаграммы посещаемости
const AttendanceChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Посещаемость по группам</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="present" name="Присутствовало" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="absent" name="Отсутствовало" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Компонент диаграммы финансов
const FinanceChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Финансовый отчет</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Area type="monotone" dataKey="income" name="Доход" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
          <Area type="monotone" dataKey="expenses" name="Расходы" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Компонент диаграммы студентов
const StudentsChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Динамика регистраций</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line 
            type="monotone" 
            dataKey="students" 
            name="Студенты" 
            stroke="#4f46e5" 
            strokeWidth={2}
            dot={{ stroke: '#4f46e5', strokeWidth: 2, r: 4, fill: 'white' }}
            activeDot={{ stroke: '#4f46e5', strokeWidth: 2, r: 6, fill: 'white' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Компонент распределения студентов по возрасту
const StudentAgeDistribution = ({ data }) => {
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];
  
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Распределение по возрасту</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} студентов`, '']}
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Компонент диаграммы курсов
const CoursesChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Популярность курсов</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis type="number" fontSize={12} />
          <YAxis type="category" dataKey="name" fontSize={12} width={90} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <Bar dataKey="students" name="Количество студентов" fill="#4f46e5" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Компонент информации о филиалах
const BranchesInfo = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Статистика по филиалам</h2>
      <div className="space-y-4">
        {data.map((branch, index) => (
          <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-medium text-gray-800">{branch.name}</h3>
              <div className="text-sm text-gray-500">Студентов: {branch.students}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-800">{branch.teachers} учителей</div>
              <div className="text-sm text-gray-500">{branch.groups} групп</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Компонент недавних платежей
const RecentPayments = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Последние платежи</h2>
      <div className="space-y-3">
        {data.map((payment, index) => (
          <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center">
              <div className={`${payment.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'} p-2 rounded-full mr-3`}>
                <DollarSign className={`w-4 h-4 ${payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
              <div>
                <div className="font-medium text-gray-800">{payment.student}</div>
                <div className="text-xs text-gray-500">{payment.course}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-800">{payment.amount}</div>
              <div className="text-xs text-gray-500">{payment.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Компонент просроченных платежей
const OverduePayments = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Просроченные платежи</h2>
      <div className="space-y-3">
        {data.map((payment, index) => (
          <div key={index} className="flex items-center justify-between border-l-4 border-red-500 pl-3 py-2">
            <div>
              <div className="font-medium text-gray-800">{payment.student}</div>
              <div className="text-xs text-gray-500">{payment.course}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-red-500">{payment.amount}</div>
              <div className="text-xs text-gray-500">Просрочено: {payment.days} дней</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Основной компонент дашборда
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  
  // Мокап данных для статистики
  const statCards = useMemo(() => [
    { 
      title: "Студенты", 
      value: "128", 
      icon: Users, 
      iconColor: "text-indigo-600", 
      bgColor: "bg-indigo-100", 
      trend: "up", 
      trendValue: "+5%" 
    },
    { 
      title: "Курсы", 
      value: "24", 
      icon: BookOpen, 
      iconColor: "text-blue-600", 
      bgColor: "bg-blue-100", 
      trend: "up", 
      trendValue: "+2" 
    },
    { 
      title: "Преподаватели", 
      value: "14", 
      icon: Star, 
      iconColor: "text-yellow-600", 
      bgColor: "bg-yellow-100", 
      trend: "up", 
      trendValue: "+1" 
    },
    { 
      title: "Ожидают оплаты", 
      value: "15", 
      icon: AlertCircle, 
      iconColor: "text-red-600", 
      bgColor: "bg-red-100", 
      trend: "down", 
      trendValue: "-3" 
    }
  ], []);

  // Мокап данных графиков
  const chartData = useMemo(() => ({
    students: [
      { month: "Янв", students: 65 },
      { month: "Фев", students: 72 },
      { month: "Мар", students: 86 },
      { month: "Апр", students: 93 },
      { month: "Май", students: 85 },
      { month: "Июн", students: 95 },
      { month: "Июл", students: 105 },
      { month: "Авг", students: 110 },
      { month: "Сен", students: 122 },
      { month: "Окт", students: 128 }
    ],
    finance: [
      { month: "Янв", income: 4200, expenses: 3800 },
      { month: "Фев", income: 4800, expenses: 4100 },
      { month: "Мар", income: 5400, expenses: 4400 },
      { month: "Апр", income: 6200, expenses: 4800 },
      { month: "Май", income: 5800, expenses: 4600 },
      { month: "Июн", income: 6500, expenses: 5100 },
      { month: "Июл", income: 7100, expenses: 5400 },
      { month: "Авг", income: 7400, expenses: 5700 },
      { month: "Сен", income: 7900, expenses: 6000 },
      { month: "Окт", income: 8500, expenses: 6300 }
    ],
    attendance: [
      { name: "JavaScript", present: 25, absent: 3 },
      { name: "Python", present: 18, absent: 2 },
      { name: "Английский", present: 32, absent: 4 },
      { name: "Веб-дизайн", present: 15, absent: 1 },
      { name: "PHP", present: 12, absent: 2 }
    ],
    ageDistribution: [
      { name: "4-7 лет", value: 32 },
      { name: "8-11 лет", value: 45 },
      { name: "12-17 лет", value: 36 },
      { name: "18+ лет", value: 15 }
    ],
    popularCourses: [
      { name: "JavaScript", students: 32 },
      { name: "Английский", students: 28 },
      { name: "Python", students: 25 },
      { name: "Веб-дизайн", students: 18 },
      { name: "PHP", students: 14 }
    ],
    branches: [
      { name: "Центральный филиал", students: 54, teachers: 6, groups: 8 },
      { name: "Южный филиал", students: 42, teachers: 4, groups: 6 },
      { name: "Северный филиал", students: 32, teachers: 4, groups: 5 }
    ],
    recentPayments: [
      { student: "Рахмонов Ислом", course: "JavaScript Основы", amount: "1200 сомони", date: "Сегодня, 14:30", status: "completed" },
      { student: "Каримова Нилуфар", course: "Английский B2", amount: "950 сомони", date: "Вчера, 16:45", status: "completed" },
      { student: "Саидов Фирдавс", course: "Python Advanced", amount: "1400 сомони", date: "20.05.2025", status: "pending" }
    ],
    overduePayments: [
      { student: "Каримов Рустам", course: "JavaScript Advanced", amount: "1200 сомони", days: 15 },
      { student: "Шарифова Зарина", course: "Английский С1", amount: "800 сомони", days: 10 },
      { student: "Ахмедов Сорбон", course: "Веб-дизайн", amount: "950 сомони", days: 7 }
    ]
  }), []);

  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="mt-4 text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      {/* Заголовок страницы */}
      <div className="max-w-7xl mx-auto pb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Статистика образовательного центра</h1>
        <p className="text-gray-500 mt-1">Обзор ключевых показателей</p>
      </div>
      
      {/* Статистические карточки */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              iconColor={card.iconColor}
              bgColor={card.bgColor}
              trend={card.trend}
              trendValue={card.trendValue}
            />
          ))}
        </div>
      </div>
      
      {/* Основные графики */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudentsChart data={chartData.students} />
          <FinanceChart data={chartData.finance} />
        </div>
      </div>
      
      {/* Вторичные графики и данные */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceChart data={chartData.attendance} />
          <StudentAgeDistribution data={chartData.ageDistribution} />
        </div>
      </div>
      
      {/* Данные о курсах и филиалах */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CoursesChart data={chartData.popularCourses} />
          <BranchesInfo data={chartData.branches} />
        </div>
      </div>
      
      {/* Информация о платежах */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentPayments data={chartData.recentPayments} />
          <OverduePayments data={chartData.overduePayments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;