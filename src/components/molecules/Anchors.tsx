import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { LinkProps } from 'react-scroll';
import styled from 'styled-components';
import { useScroll } from '~/hooks/useScroll';
import { Anchor } from '~/pages/blog/post/[slug]';

interface AnchorsProps {
  anchors: Anchor[];
}

const Li = styled.li<{ active: boolean }>`
  color: ${(props) => (props.active ? 'var(--accent-pink)' : 'var(--text-secondary)')};
  transition: color 300ms;

  :hover {
    color: var(--accent-pink);
  }
`;

const Link = dynamic<LinkProps>(async () => await import('react-scroll').then((a) => a.Link));

export function Anchors({ anchors }: AnchorsProps) {
  const [active, setActive] = useState<number | null>();

  useEffect(() => {
    anchors.forEach((anchor) => {
      const element = document.getElementById(anchor.slug);

      if (!element) return;

      anchor.position = element.offsetTop;
    });
  }, [anchors]);

  useScroll((position) => {
    const bodyRect = document.body.getBoundingClientRect();

    anchors.some((anchor, index) => {
      const nextAnchor =
        index === anchors.length - 1 ? bodyRect.height : anchors[index + 1].position;
      if (anchor.position <= position + 1 && position + 1 <= nextAnchor) {
        setActive(index);
        return true;
      }
      setActive(null);
    });
  });

  return anchors.length > 1 ? (
    <div className="hidden lg:block sticky top-0 overflow-auto h-full pl-20">
      <ul>
        {anchors.map((anchor, index) => (
          <Link
            className="cursor-pointer"
            to={anchor.title}
            smooth
            duration={500}
            key={anchor.title}
          >
            <Li active={active === index} className="text-xs">
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
