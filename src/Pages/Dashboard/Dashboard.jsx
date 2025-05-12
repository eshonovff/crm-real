import { BookOpen, Calendar, Star, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Главная</h1>
        <div className="text-sm text-gray-500">Последнее обновление: сегодня</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Студенты</p>
              <h2 className="text-2xl font-bold text-gray-800">128</h2>
            </div>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-500 text-sm">+5% </span>
            <span className="text-gray-500 text-sm ml-1">По сравнению с прошлым месяцем</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Курсы</p>
              <h2 className="text-2xl font-bold text-gray-800">24</h2>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-500 text-sm">+2 </span>
            <span className="text-gray-500 text-sm ml-1">Новых курса в этом месяце</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Расписание</p>
              <h2 className="text-2xl font-bold text-gray-800">48</h2>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-gray-500 text-sm">Занятий на этой неделе</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Отзывы</p>
              <h2 className="text-2xl font-bold text-gray-800">56</h2>
            </div>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-500 text-sm">4.8 </span>
            <span className="text-gray-500 text-sm ml-1">Средний рейтинг</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Последние активности</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(item => (
              <div key={item} className="flex items-start border-b border-gray-100 pb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Новый студент зарегистрирован</p>
                  <p className="text-sm text-gray-600">Иван Петров присоединился к курсу "JavaScript Основы"</p>
                  <p className="text-xs text-gray-500 mt-1">2 часа назад</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              Показать больше
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Предстоящие события</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="border-l-4 border-indigo-500 pl-3 py-2">
                <p className="text-sm font-medium text-gray-800">Лекция по React JS</p>
                <p className="text-xs text-gray-500">Сегодня, 15:00</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              Открыть расписание
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;