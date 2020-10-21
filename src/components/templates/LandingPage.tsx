import { useState } from 'react';
import styled from 'styled-components';
import { useThemeMode } from '~/hooks/useThemeMode';

const Container = styled.div`
  display: grid;

  place-items: center;

  height: 90vh;
`;

export function LandingPageTemplate() {
  const [image, setImage] = useState('');
  useThemeMode((darkMode) => setImage(darkMode.value ? '/MonxOpen.png' : '/MonxClosed.png'));

  return (
    <Container>
      <img width="200" src={image} />
    </Container>
  );
}
