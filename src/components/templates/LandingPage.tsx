import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from 'next-themes';
import { Image } from '../atoms/Image';

const Container = styled.div`
  display: grid;
  place-items: center;

  height: 90vh;
`;

export function LandingPageTemplate() {
  const [image, setImage] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setImage(theme === 'dark' ? 'MonxOpen.png' : 'MonxClosed.png');
  }, [theme]);

  return <Container>{image && <Image width="200" src={image} />}</Container>;
}
