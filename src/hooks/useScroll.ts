import { useEffect } from 'react';

export function useScroll(scrollCallback: (y: number) => void) {
  const handleScroll = () => {
    scrollCallback(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
