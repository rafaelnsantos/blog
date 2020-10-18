import { Link } from 'react-scroll';
import styled from 'styled-components';
import { Anchor } from '~/pages/blog/post/[slug]';

interface AnchorsProps {
  anchors: Anchor[];
}

const Li = styled.li`
  color: var(--text-secondary);
  transition: color 300ms;

  :hover {
    color: var(--accent-pink);
  }
`;

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
              <Li className="text-xs">{anchor.title}</Li>
            </Link>
          ))}
        </ul>
      </div>
    )
  );
}
