import { NavLink, HeaderNav } from './HeaderNav';
import { ToggleThemeButton } from './ToggleThemeButton';
import { HeaderLogo } from './HeaderLogo';

interface HeaderProps {
  links: NavLink[];
}

export function Header({ links }: HeaderProps) {
  return (
    <header className="flex flex-row">
      <HeaderLogo />
      <HeaderNav links={links} />
      <ToggleThemeButton />
    </header>
  );
}
