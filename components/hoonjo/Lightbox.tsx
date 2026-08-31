"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type LightboxImage = { src: string; alt: string };

type LightboxCtx = {
  openImage: (src: string, alt: string) => void;
  openGallery: (images: LightboxImage[], initialIndex?: number) => void;
};

const Ctx = createContext<LightboxCtx>({
  openImage: () => {},
  openGallery: () => {},
});

export function useLightbox() {
  return useContext(Ctx);
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<LightboxImage[] | null>(null);
  const [index, setIndex] = useState<number>(0);

  const openGallery = useCallback((images: LightboxImage[], initialIndex = 0) => {
    if (!images || images.length === 0) return;
    setGallery(images);
    setIndex(Math.max(0, Math.min(initialIndex, images.length - 1)));
  }, []);

  const openImage = useCallback((src: string, alt: string) => {
    setGallery([{ src, alt }]);
    setIndex(0);
  }, []);

  const close = useCallback(() => {
    setGallery(null);
    setIndex(0);
  }, []);

  const next = useCallback(() => {
    if (!gallery || gallery.length <= 1) return;
    setIndex((i) => (i + 1) % gallery.length);
  }, [gallery]);

  const prev = useCallback(() => {
    if (!gallery || gallery.length <= 1) return;
    setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  }, [gallery]);

  useEffect(() => {
    if (!gallery) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [gallery, close, next, prev]);

  const current = gallery ? gallery[index] : null;

  return (
    <Ctx.Provider value={{ openImage, openGallery }}>
      {children}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          className="fixed inset-0 z-[100] bg-[rgba(11,12,14,0.92)] flex flex-col items-center justify-center p-[clamp(16px,4vw,56px)] backdrop-blur-[6px] animate-in fade-in duration-150"
        >
          {/* Top Bar: Counter & Close button */}
          <div className="fixed top-4 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
            <div className="font-hj-mono text-[13px] text-[rgba(246,244,238,0.75)] bg-[rgba(12,11,8,0.6)] px-3 py-1.5 rounded-full border border-[rgba(246,244,238,0.2)] pointer-events-auto">
              {gallery && gallery.length > 1 ? `${index + 1} / ${gallery.length}` : 'IMAGE'}
            </div>
            <button
              type="button"
              aria-label="닫기"
              onClick={close}
              className="w-10 h-10 rounded-full border border-[rgba(246,244,238,0.3)] bg-[rgba(12,11,8,0.6)] text-hj-on-ink font-hj-mono text-[16px] cursor-pointer inline-flex items-center justify-center transition-colors hover:bg-[rgba(246,244,238,0.2)] pointer-events-auto"
            >
              ✕
            </button>
          </div>

          {/* Main Image Container */}
          <div className="relative max-w-[94vw] max-h-[82vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="max-w-[94vw] max-h-[82vh] object-contain rounded-hj-md shadow-[0_24px_80px_rgba(0,0,0,0.7)] select-none cursor-default"
            />

            {/* Prev / Next Navigation Buttons (when multiple images) */}
            {gallery && gallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="이전 이미지"
                  onClick={prev}
                  className="absolute left-[-20px] max-[720px]:left-2 w-11 h-11 rounded-full border border-[rgba(246,244,238,0.3)] bg-[rgba(12,11,8,0.7)] text-hj-on-ink font-hj-mono text-[20px] cursor-pointer inline-flex items-center justify-center transition-all hover:scale-105 hover:bg-[rgba(246,244,238,0.2)]"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="다음 이미지"
                  onClick={next}
                  className="absolute right-[-20px] max-[720px]:right-2 w-11 h-11 rounded-full border border-[rgba(246,244,238,0.3)] bg-[rgba(12,11,8,0.7)] text-hj-on-ink font-hj-mono text-[20px] cursor-pointer inline-flex items-center justify-center transition-all hover:scale-105 hover:bg-[rgba(246,244,238,0.2)]"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption */}
          {current.alt && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-4 max-w-[80ch] text-center font-hj-serif text-[14px] text-[rgba(246,244,238,0.85)] bg-[rgba(12,11,8,0.6)] px-4 py-2 rounded-hj-sm border border-[rgba(246,244,238,0.15)] shadow-hj-soft"
            >
              {current.alt}
            </div>
          )}
        </div>
      )}
    </Ctx.Provider>
  );
}

/* A screenshot gallery — one large hero + a thumbnail row, all zoomable. */
export function Gallery({ images }: { images: LightboxImage[] }) {
  const { openGallery } = useLightbox();
  if (!images || images.length === 0) return null;
  const [hero, ...rest] = images;

  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="group relative cursor-zoom-in overflow-hidden rounded-hj-md border border-hj-steel shadow-hj-soft bg-hj-paper transition-[border-color,box-shadow] duration-150 hover:border-hj-blue hover:shadow-hj-soft-lg"
        onClick={() => openGallery(images, 0)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.src}
          alt={hero.alt}
          loading="lazy"
          decoding="async"
          className="w-full block transition-transform duration-200 group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-hj-fg/0 transition-colors duration-150 group-hover:bg-hj-fg/5 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 font-hj-mono text-[11px] font-semibold text-hj-on-ink bg-hj-ink/80 px-2.5 py-1 rounded-full border border-hj-line shadow-hj-soft">
            클릭하여 확대 🔍
          </span>
        </div>
      </div>
      {rest.length > 0 && (
        <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${rest.length}, 1fr)` }}>
          {rest.map((im, i) => (
            <div
              key={im.src}
              className="group relative cursor-zoom-in overflow-hidden rounded-hj-sm border border-hj-steel bg-hj-paper transition-[border-color] duration-150 hover:border-hj-blue"
              onClick={() => openGallery(images, i + 1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={im.src}
                alt={im.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-[88px] object-cover object-top block transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-hj-fg/0 transition-colors duration-150 group-hover:bg-hj-fg/10" />
            </div>
          ))}
        </div>
      )}
      <div className="font-hj-mono text-[11px] text-hj-muted">실제 화면 {images.length}컷 · 클릭하면 고화질 전체화면 확대</div>
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
      className={`cursor-zoom-in transition-transform duration-150 hover:scale-[1.01] ${className ?? ''}`}
      onClick={() => openImage(src, alt)}
    />
  );
}
