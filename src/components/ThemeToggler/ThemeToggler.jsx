// components/ThemeToggler/ThemeToggler.jsx
import React, { useState, useEffect } from 'react'
import './ThemeToggler.css'

const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(false)
  
  // Добавляем дополнительные стили программно
  const injectStyles = (isDark) => {
    const styleId = 'dark-mode-extra-styles'
    let styleElement = document.getElementById(styleId)
    
    if (isDark) {
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = styleId
        styleElement.innerHTML = `
          body.dark-mode header { background-color: #111827 !important; color: #f9fafb !important; }
          body.dark-mode footer { background-color: #111827 !important; color: #d1d5db !important; }
          body.dark-mode .bg-gray-100 { background-color: #111827 !important; }
          body.dark-mode .text-gray-600 { color: #d1d5db !important; }
          body.dark-mode main { background-color: #1f2937 !important; }
        `
        document.head.appendChild(styleElement)
      }
    } else {
      if (styleElement) {
        styleElement.remove()
      }
    }
  }
  
  useEffect(() => {
    // Проверяем localStorage при загрузке
    const savedMode = localStorage.getItem('darkMode') === 'true'
    if (savedMode) {
      setIsDark(true)
      document.body.classList.add('dark-mode')
      injectStyles(true)
    }
  }, [])
  
  const toggleDarkMode = () => {
    const newMode = !isDark
    setIsDark(newMode)
    
    // Переключаем класс на body
    document.body.classList.toggle('dark-mode', newMode)
    
    // Инъекция стилей
    injectStyles(newMode)
    
    // Сохраняем выбор
    localStorage.setItem('darkMode', newMode.toString())
  }
  
  return (
    <button 
      onClick={toggleDarkMode}
      className="theme-toggle-btn"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggler