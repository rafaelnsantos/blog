import { useEffect } from 'react';

export function useScroll(scrollCallback: (y: number) => void) {
  let ticking = false;

  const handleScroll = (e: Event) => {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        scrollCallback(window.scrollY);
        ticking = false;
      });

      ticking = true;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
