import { useEffect } from 'react'
import useDarkMode from 'use-dark-mode'
import { COLORS } from '~/theme/colors'
/*
This component handles client-side color scheme switching. Specifically, if the
user were to have the site open and change their light/dark mode preferences,
of if they are viewing the site at sunset and dark mode turns on automatically.
*/
export function DarkModeProvider() {
  const darkMode = useDarkMode(null, { storageKey: 'theme' })

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const prefersDarkFromMQ = darkMode.value !== null ? darkMode.value : mql.matches
    const colorMode = prefersDarkFromMQ ? 'dark' : 'light'

    const root = document.documentElement

    Object.entries(COLORS).forEach(([name, colorByTheme]) => {
      const cssVarName = `--${name}`

      root.style.setProperty(cssVarName, colorByTheme[colorMode])
    })
  }, [darkMode, darkMode.value])

  return null
}