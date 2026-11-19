import React, { useEffect, useRef, useState } from 'react';

interface ViewportVideoProps {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  'data-testid'?: string;
}

/**
 * Viewport-aware video player that defers heavy network buffering until
 * the user approaches the section (within 500px) and pauses playback when
 * scrolled off-screen to keep PC CPU/GPU smooth and first paint fast.
 */
export const ViewportVideo: React.FC<ViewportVideoProps> = ({
  src,
  poster,
  className = '',
  controls = false,
  loop = true,
  muted = true,
  'data-testid': dataTestId,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    // Load slightly ahead of scroll so playback starts immediately on arrival
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: '550px 0px' }
    );

    // Pause when scrolled off-screen, resume when back in view
    const playObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { rootMargin: '120px 0px', threshold: 0.05 }
    );

    preloadObserver.observe(el);
    playObserver.observe(el);

    return () => {
      preloadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (shouldLoad && el) {
      el.muted = muted;
      el.play().catch(() => {});
    }
  }, [shouldLoad, muted]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      autoPlay={shouldLoad}
      loop={loop}
      muted={muted}
      playsInline
      controls={controls}
      preload={shouldLoad ? 'auto' : 'none'}
      data-testid={dataTestId}
      className={className}
    />
  );
};
