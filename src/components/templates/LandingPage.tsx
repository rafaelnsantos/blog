import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';

const Container = styled.div`
  display: grid;

  place-items: center;

  height: 90vh;
`;

export function LandingPageTemplate() {
  const darkMode = useDarkMode(undefined, { storageKey: 'dark' });
  return (
    <Container>
      <img width="200" src={darkMode.value ? '/MonxOpen.png' : '/MonxClosed.png'} />
    </Container>
  );
}
