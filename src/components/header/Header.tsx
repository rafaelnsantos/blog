import { NavLink, HeaderNav } from './HeaderNav';
import { ToggleThemeButton } from './ToggleThemeButton';
import { HeaderLogo } from './HeaderLogo';

interface HeaderProps {
  links: NavLink[];
  title: string;
}

export function Header({ links, title }: HeaderProps) {
  return (
    <header className="h-16 flex flex-row justify-between md:max-w-screen-xl items-center container mt-0 mb-0 mr-auto ml-auto">
      <HeaderLogo text={title} />
      <div className="flex flex-row items-center">
        <HeaderNav links={links} />
        <ToggleThemeButton />
      </div>
    </header>
  );
}
