import { useEffect, useRef, useState } from 'react';

// Plays a Mixkit stock clip (free licence). Uses a self-hosted copy in /videos/stock when present.
// Loads and plays only while on screen; respects reduced-motion; shows the poster on any failure.
export function StockVideo({ id, name, poster, className = '', hoverOnly = false, ownFrame = false }) {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduce || !id) return undefined;
    const el = ref.current;
    let live = true;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || src) return;
      const local = `/videos/stock/${name}.mp4`;
      fetch(local, { method: 'HEAD' })
        .then((r) => (r.ok && (r.headers.get('content-type') || '').startsWith('video') ? local : `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`))
        .catch(() => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`)
        .then((u) => { if (live) setSrc(u); });
    }, { rootMargin: '200px' });
    if (el) io.observe(el);
    return () => { live = false; io.disconnect(); };
  }, [id, name, reduce, src]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src || hoverOnly) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [src, hoverOnly]);

  if (failed || (reduce && !ownFrame)) return <img src={poster} alt="" className={className} />;
  return (
    <video
      ref={(el) => { ref.current = el; if (el) { el.muted = true; el.setAttribute('muted', ''); } }}
      className={className}
      src={src ? (ownFrame ? `${src}#t=1.5` : src) : undefined}
      poster={ownFrame ? undefined : poster}
      muted loop playsInline preload="metadata"
      onMouseEnter={hoverOnly ? (e) => e.currentTarget.play().catch(() => {}) : undefined}
      onMouseLeave={hoverOnly ? (e) => e.currentTarget.pause() : undefined}
      onError={() => setFailed(true)}
    />
  );
}
