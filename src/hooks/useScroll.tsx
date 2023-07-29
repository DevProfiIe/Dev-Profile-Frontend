import { useEffect, useState } from 'react';

interface UseScrollCustomHookReTurns {
  scrollY: number;
  scrollDirection: 'down' | 'up' | null;
}

const useScroll = (): UseScrollCustomHookReTurns => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState<DOMRect>(document.body.getBoundingClientRect());
  const [scrollY, setScrollY] = useState<number>(bodyOffset.top);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(null);

  const listener = () => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(window.scrollY);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up');
    setLastScrollTop(-bodyOffset.top);
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return {
    scrollY,
    scrollDirection,
  };
};

export default useScroll;
