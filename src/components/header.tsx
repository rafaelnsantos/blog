import useDarkMode from 'use-dark-mode';
import { useRouter } from 'next/router';

interface NavLink {
  title: string;
  path: string;
}

interface HeaderProps {
  links: NavLink[];
}

export function Header({ links }: HeaderProps) {
  const router = useRouter();

  const renderLink = (link: NavLink) => (
    <div className="mr-6" key={link.title}>
      {router.route === link.path ? link.title : <a href={link.path}>{link.title}</a>}
    </div>
  );

  return (
    <header className="flex flex-row">
      {links.map(renderLink)}
      <ToggleThemeButton />
    </header>
  );
}

const ToggleThemeButton = () => {
  const darkMode = useDarkMode(null, { storageKey: 'theme' });

  return <button onClick={darkMode.toggle}>toggle</button>;
};
