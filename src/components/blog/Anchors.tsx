import dynamic from 'next/dynamic';
import { LinkProps } from 'react-scroll';
import styled from 'styled-components';
import { Anchor } from '~/pages/blog/post/[slug]';

interface AnchorsProps {
  anchors: Anchor[];
  active?: string;
  onClick: (anchor: string) => void;
}

const Li = styled.li<{ active: boolean }>`
  color: ${(props) => (props.active ? 'var(--accent-pink)' : 'var(--text-secondary)')};
  transition: color 300ms;

  :hover {
    color: var(--accent-pink);
  }
`;

const Link = dynamic<LinkProps>(async () => await import('react-scroll').then((a) => a.Link));

export function Anchors({ anchors, active, onClick }: AnchorsProps) {
  return anchors.length > 1 ? (
    <div className="hidden lg:block sticky top-0 overflow-auto h-full pl-20">
      <ul>
        {anchors.map((anchor) => (
          <Link
            className="cursor-pointer"
            to={anchor.title}
            smooth
            duration={500}
            key={anchor.title}
            onClick={() => onClick(anchor.title)}
          >
            <Li active={active === anchor.title} className="text-xs">
              {anchor.title}
            </Li>
          </Link>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
}
