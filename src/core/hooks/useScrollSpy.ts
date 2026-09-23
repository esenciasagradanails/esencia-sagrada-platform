import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentSection = '';

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          // We check the element's position relative to the viewport
          // plus the document scroll to get absolute position.
          const elementTop = top + window.scrollY;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Call it once to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
