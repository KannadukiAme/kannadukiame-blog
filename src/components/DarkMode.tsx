import { useEffect, useState } from 'react'

export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    const element = document.documentElement

    if (isDarkMode) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      <i className={`w-4 h-4 fa ${isDarkMode ? 'fa-sun' : 'fa-moon'}`} />
    </button>
  )
}
