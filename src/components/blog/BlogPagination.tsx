import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';

interface BlogPaginationProps {
  pages: number;
  page: number;

  preview?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Page = styled.div<{ active: boolean }>`
  font-weight: ${(props) => (props.active ? 800 : 500)};
`;

export const BlogPagination = (props: BlogPaginationProps) => {
  const pages = useMemo(() => {
    const pageNumber: number[] = [];
    for (let i = 1; i <= props.pages; i++) {
      pageNumber.push(i);
    }
    return pageNumber;
  }, [props.pages]);

  return (
    <Container>
      {pages.map((page) =>
        props.preview ? (
          <a key={page}>
            <Page active={page === props.page}>{page}</Page>
          </a>
        ) : (
          <Link key={page} href={`/blog/page/${page}`}>
            <a>
              <Page active={page === props.page}>{page}</Page>
            </a>
          </Link>
        )
      )}
    </Container>
  );
};
