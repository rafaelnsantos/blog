import styled from 'styled-components';
import { Header } from './header/Header';

interface PageProps {
  children: React.ReactNode;
}

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

export function Page(props: PageProps) {
  return (
    <PageContainer>
      <Header
        links={[
          { title: 'home', path: '/' },
          { title: 'blog', path: '/blog' },
        ]}
      />
      {props.children}
    </PageContainer>
  );
}
