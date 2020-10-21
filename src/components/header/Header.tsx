import { NavLink, HeaderNav } from './HeaderNav';
import { ToggleThemeButton } from './ToggleThemeButton';
import { HeaderLogo } from './HeaderLogo';

interface HeaderProps {
  links: NavLink[];
}

export function Header({ links }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between md:max-w-screen-xl items-center container mt-0 mb-0 mr-auto ml-auto">
      <HeaderLogo />
      <div className="flex flex-row">
        <HeaderNav links={links} />
        <ToggleThemeButton />
      </div>
    </header>
  );
}
