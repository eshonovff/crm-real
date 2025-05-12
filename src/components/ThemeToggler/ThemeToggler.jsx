import React, {useEffect, useLayoutEffect, useState} from 'react'

const ThemeToggler = () => {
    const [isDark, setIsDark] = useState(false)

    useLayoutEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark')
            setIsDark(true)
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const toggleTheme = () => {
        const newMode = !isDark
        setIsDark(newMode)

        if (newMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 flex items-center p-1"
        >
        <span
            className={`absolute w-6 h-6 rounded-full bg-white  shadow-md transform transition-transform duration-300 ease-in-out ${
                isDark ? 'translate-x-8' : 'translate-x-0'
            }`}
        />
        </button>
    )
}

export default ThemeToggler
