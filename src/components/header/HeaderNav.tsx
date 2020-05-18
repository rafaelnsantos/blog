import { useRouter } from 'next/router';
import Link from 'next/link';

export interface NavLink {
  title: string;
  path: string;
}

interface HeaderNavProps {
  links: NavLink[];
}

export function HeaderNav({ links }: HeaderNavProps) {
  const router = useRouter();

  const renderLink = (link: NavLink) => (
    <div className="mr-6" key={link.title}>
      {router.route === link.path ? (
        link.title.toUpperCase()
      ) : (
        <Link href={link.path}>
          <a>{link.title.toUpperCase()}</a>
        </Link>
      )}
    </div>
  );
  return <nav className="flex flex-row">{links.map(renderLink)}</nav>;
}
