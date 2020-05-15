import useDarkMode from 'use-dark-mode'

export function Header () {
  const darkMode = useDarkMode(null, { storageKey: 'theme' })

  return (
    <div>
        Title
        <button onClick={darkMode.toggle}>toggle</button>
    </div>
  )
}