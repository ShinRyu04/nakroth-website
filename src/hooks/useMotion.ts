import { useEffect, type RefObject } from 'react';

/**
 * Observes [data-reveal] elements within the current route and reveals them
 * smoothly on scroll using GPU-composited opacity + transform transitions.
 */
export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduced || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('js');

    const vh = window.innerHeight || 900;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );

    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.94) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [routeKey]);
}

/**
 * Drives a GPU scaleX scroll-progress bar along the bottom of the sticky header.
 */
export function useScrollProgress(barRef: RefObject<HTMLDivElement | null>, routeKey: string) {
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };

    const onScroll = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [barRef, routeKey]);
}
