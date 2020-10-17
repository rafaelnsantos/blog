import { Anchor } from '~/pages/blog/[slug]';
import { Link } from 'react-scroll';

interface AnchorsProps {
  anchors: Anchor[];
}

export function Anchors({ anchors }: AnchorsProps) {
  return (
    anchors.length > 1 && (
      <div className="hidden lg:block sticky top-0 overflow-auto h-full pl-20">
        <div>Table of Contents</div>
        <ul>
          {anchors.map((anchor) => (
            <Link
              className="cursor-pointer"
              to={anchor.slug}
              smooth
              duration={500}
              key={anchor.title}
            >
              <li className="text-xs hover:text-pink-500 text-primary">{anchor.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    )
  );
}
