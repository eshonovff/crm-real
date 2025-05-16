import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

const StatCard = ({ title, value, icon, iconColor, bgColor, trend, trendValue }) => {
  const Icon = icon;
 
  return (
    <div className="bg-white rounded-lg shadow p-5 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        </div>
        <div className={`${bgColor} p-2 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4">
          <span className={trend === 'up' ? 'text-green-500 text-sm flex items-center' : 'text-red-500 text-sm flex items-center'}>
            {trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
            {trendValue}
          </span>
          <span className="text-gray-500 text-sm ml-1">По сравнению с прошлым месяцем</span>
        </div>
      )}
    </div>
  );
};

export default StatCard