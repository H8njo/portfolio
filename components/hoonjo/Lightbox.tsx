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
          role="dialog"
          aria-modal="true"
          aria-label={img.alt}
          onClick={close}
          className="fixed inset-0 z-[100] bg-[rgba(11,12,14,0.9)] flex items-center justify-center p-[clamp(16px,4vw,56px)] cursor-zoom-out backdrop-blur-[3px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[96vw] max-h-[92vh] object-contain rounded-hj-md shadow-[0_24px_70px_rgba(0,0,0,0.55)] cursor-default"
          />
          <button
            aria-label="닫기"
            onClick={close}
            className="fixed top-[18px] right-5 w-10 h-10 rounded-full border border-[rgba(246,244,238,0.3)] bg-[rgba(12,11,8,0.5)] text-hj-on-ink font-hj-mono text-[16px] cursor-pointer inline-flex items-center justify-center"
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
    <div className="flex flex-col gap-2.5">
      <ZoomImage src={hero.src} alt={hero.alt} className="w-full block rounded-hj-md border border-hj-steel shadow-hj-soft bg-hj-paper" />
      {rest.length > 0 && (
        <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${rest.length}, 1fr)` }}>
          {rest.map((im) => (
            <ZoomImage key={im.src} src={im.src} alt={im.alt} className="w-full h-[88px] object-cover object-top block rounded-hj-sm border border-hj-steel bg-hj-paper" />
          ))}
        </div>
      )}
      <div className="font-hj-mono text-[11px] text-hj-muted">실제 화면 {images.length}컷 · 클릭하면 확대</div>
    </div>
  );
}

/* A clickable image that opens itself in the lightbox. */
export function ZoomImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const { openImage } = useLightbox();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`cursor-zoom-in ${className ?? ''}`}
      onClick={() => openImage(src, alt)}
    />
  );
}
