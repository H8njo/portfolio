"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/* Click-to-zoom image lightbox. A provider at the .hoonjo root exposes
   openImage(src, alt); any image calls it on click. Closes on backdrop click
   or Esc, locks body scroll while open. Self-contained. */

type LightboxCtx = { openImage: (src: string, alt: string) => void };
const Ctx = createContext<LightboxCtx>({ openImage: () => {} });

export function useLightbox() {
  return useContext(Ctx);
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);
  const openImage = useCallback((src: string, alt: string) => setImg({ src, alt }), []);
  const close = useCallback(() => setImg(null), []);

  useEffect(() => {
    if (!img) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [img, close]);

  return (
    <Ctx.Provider value={{ openImage }}>
      {children}
      {img && (
        <div
          className="hoonjo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={img.alt}
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(11,12,14,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 4vw, 56px)',
            cursor: 'zoom-out', WebkitBackdropFilter: 'blur(3px)', backdropFilter: 'blur(3px)',
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '96vw', maxHeight: '92vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 24px 70px rgba(0,0,0,0.55)', cursor: 'default' }}
          />
          <button
            aria-label="닫기"
            onClick={close}
            style={{
              position: 'fixed', top: 18, right: 20, width: 40, height: 40, borderRadius: '50%',
              border: '1px solid rgba(246,244,238,0.3)', background: 'rgba(12,11,8,0.5)', color: 'var(--on-ink)',
              fontFamily: 'var(--font-mono)', fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>
      )}
    </Ctx.Provider>
  );
}

/* A screenshot gallery — one large hero + a thumbnail row, all zoomable. */
export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  if (!images || images.length === 0) return null;
  const [hero, ...rest] = images;
  return (
    <div className="hoonjo-gallery" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <ZoomImage src={hero.src} alt={hero.alt} style={{ width: '100%', display: 'block', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-soft)', background: 'var(--paper)' }} />
      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${rest.length}, 1fr)`, gap: 10 }}>
          {rest.map((im) => (
            <ZoomImage key={im.src} src={im.src} alt={im.alt} style={{ width: '100%', height: 74, objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)', background: 'var(--paper)' }} />
          ))}
        </div>
      )}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>실제 화면 {images.length}컷 · 클릭하면 확대</div>
    </div>
  );
}

/* A clickable image that opens itself in the lightbox. */
export function ZoomImage({ src, alt, style, className }: { src: string; alt: string; style?: React.CSSProperties; className?: string }) {
  const { openImage } = useLightbox();
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onClick={() => openImage(src, alt)}
      style={{ cursor: 'zoom-in', ...style }}
    />
  );
}
