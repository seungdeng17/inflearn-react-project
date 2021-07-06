import { useCallback, useEffect, useRef } from "react";

export default function useInfinityScroll(
  callback,
  options = {
    threshold: 0.3,
  }
) {
  const targetRef = useRef(null);

  const intersectionCallback = useCallback(
    ([entry], observer) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      callback();
      observer.observe(targetRef.current);
    },
    [callback]
  );

  useEffect(() => {
    const io = new IntersectionObserver(intersectionCallback, options);
    if (targetRef.current) io.observe(targetRef.current);

    return () => io && io.disconnect();
  }, [intersectionCallback, options]);

  return targetRef;
}
