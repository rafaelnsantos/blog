import { useState } from 'react';
import styled from 'styled-components';
import { useThemeMode } from '~/hooks/useThemeMode';
import { Image } from '../atoms/Image';

const Container = styled.div`
  display: grid;

  place-items: center;

  height: 90vh;
`;

export function LandingPageTemplate() {
  const [image, setImage] = useState('');
  useThemeMode((darkMode) => setImage(darkMode.value ? 'MonxOpen.png' : 'MonxClosed.png'));

  return (
    <Container>
      <Image width="200" src={image} />
    </Container>
  );
}
