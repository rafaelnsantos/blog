import useDarkMode from 'use-dark-mode'
import { useRouter } from 'next/router'

const HeaderLink = ({ children, ...props }) => {
  const router = useRouter()

  return router.route === props.href ? children : (
    <a {...props}>
      {children}
    </a>
  )
}


export function Header () {
  return (
    <div>
      <HeaderLink href='/'>home</HeaderLink>
      <HeaderLink href='/blog'>blog</HeaderLink>
      <ToggleThemeButton />
    </div>
  )
}

const ToggleThemeButton = () => {
  const darkMode = useDarkMode(null, { storageKey: 'theme' })

  return <button onClick={darkMode.toggle}>toggle</button> 
}