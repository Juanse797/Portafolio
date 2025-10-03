'use client';

import { useEffect, useState } from 'react';

export default function SpotlightCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // When the project modal is open, we need to show the cursor.
  useEffect(() => {
    const handleModalChange = () => {
      if (document.querySelector('[data-radix-dialog-content]')) {
        document.body.classList.remove('hide-cursor');
      } else {
        document.body.classList.add('hide-cursor');
      }
    };
    const observer = new MutationObserver(handleModalChange);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [])

  if (!isClient) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition duration-300 lg:block hidden"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(255, 0, 51, 0.1), transparent 80%)`,
      }}
    />
  );
}
