import { useEffect } from "react";

export function useNeonScroll() {
  useEffect(() => {
    const update = () => {
      const headings = document.querySelectorAll<HTMLElement>(".neon-heading");
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      headings.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        // 0 = top of viewport, 1 = bottom
        const ratio = Math.min(1, Math.max(0, elCenter / window.innerHeight));
        // Also factor in scroll position for page-level gradient
        const scrollRatio = docHeight > 0 ? window.scrollY / docHeight : 0;
        // Combine: elements at top of page = pink, further down = blue
        const t = Math.min(1, Math.max(0, (scrollRatio + (1 - ratio) * 0.3)));
        
        el.style.setProperty("--neon-pink-o", String(1 - t));
        el.style.setProperty("--neon-blue-o", String(t));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    
    // Run after a short delay to catch dynamically rendered headings
    const timer = setTimeout(update, 500);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);
}
