"use client";

import { useState, type CSSProperties, type ReactNode } from 'react';

/* Design-system primitives, ported from the hoonjo-design skill
   (components/*.jsx) to TypeScript. Inline-styled against the .hoonjo tokens
   so the whole sample folder stays self-contained and hand-off-ready. */

/* ---- Button ------------------------------------------------------------- */
type ButtonVariant = 'primary' | 'ink' | 'outline' | 'outline-ink' | 'text';
type ButtonProps = {
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  as?: 'button' | 'a';
  href?: string;
  iconRight?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
} & Record<string, unknown>;

export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  iconRight,
  children,
  style = {},
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const s = size === 'sm'
    ? { height: 38, padding: '0 16px', font: '14px' }
    : { height: 46, padding: '0 22px', font: '15px' };

  const palettes: Record<ButtonVariant, { bg: string; color: string; border: string }> = {
    primary: { bg: active ? 'var(--blue-deep)' : hover ? 'var(--blue-hover)' : 'var(--blue)', color: 'var(--on-blue)', border: 'transparent' },
    ink: { bg: active ? 'var(--ink-deep)' : hover ? 'var(--ink-soft)' : 'var(--ink)', color: 'var(--on-ink)', border: 'transparent' },
    outline: { bg: hover ? 'var(--blue-soft)' : 'transparent', color: 'var(--blue)', border: 'var(--blue)' },
    'outline-ink': { bg: hover ? 'var(--cloud)' : 'transparent', color: 'var(--text)', border: 'var(--text)' },
    text: { bg: 'transparent', color: 'var(--blue)', border: 'transparent' },
  };
  const p = palettes[variant];
  const isText = variant === 'text';

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxSizing: 'border-box',
    height: isText ? 'auto' : s.height,
    padding: isText ? '4px 0' : s.padding,
    fontFamily: isText ? 'var(--font-mono)' : 'var(--font-sans)',
    fontSize: s.font,
    fontWeight: 600,
    lineHeight: 1,
    color: p.color,
    background: p.bg,
    border: `1px solid ${p.border}`,
    borderRadius: isText ? 0 : 'var(--radius-button)',
    boxShadow: !isText && variant === 'primary' ? (active ? 'none' : '0 1px 2px rgba(27,100,218,0.28)') : 'none',
    cursor: 'pointer',
    textDecoration: isText && hover ? 'underline' : 'none',
    textUnderlineOffset: 3,
    transform: !isText && active ? 'scale(0.97)' : 'scale(1)',
    transition: 'background 150ms cubic-bezier(0.4,0,0.2,1), color 150ms ease, border-color 150ms ease, transform 120ms cubic-bezier(0.4,0,0.2,1), box-shadow 150ms ease',
    whiteSpace: 'nowrap',
    ...style,
  };

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setActive(false); },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
  };

  const content = (
    <>
      <span>{children}</span>
      {iconRight && <span aria-hidden style={{ fontSize: '1.05em', lineHeight: 0 }}>{iconRight}</span>}
    </>
  );

  if (as === 'a') {
    return <a href={href} style={base} {...handlers} {...rest}>{content}</a>;
  }
  return <button type="button" style={base} {...handlers} {...rest}>{content}</button>;
}

/* ---- Tag ---------------------------------------------------------------- */
type TagVariant = 'outline' | 'solid' | 'blue' | 'ghost';
export function Tag({ variant = 'outline', children, style = {} }: { variant?: TagVariant; children: ReactNode; style?: CSSProperties }) {
  const palettes: Record<TagVariant, { bg: string; color: string; border: string }> = {
    outline: { bg: 'transparent', color: 'var(--text-secondary)', border: 'var(--line)' },
    solid: { bg: 'var(--ink)', color: 'var(--on-ink)', border: 'var(--ink)' },
    blue: { bg: 'var(--blue-soft)', color: 'var(--blue-deep)', border: 'var(--blue-line)' },
    ghost: { bg: 'var(--cloud)', color: 'var(--text-secondary)', border: 'transparent' },
  };
  const p = palettes[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 8px',
      fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
      lineHeight: 1, color: p.color, background: p.bg, border: `1px solid ${p.border}`,
      borderRadius: 'var(--radius-xs)', whiteSpace: 'nowrap', ...style,
    }}>{children}</span>
  );
}

/* ---- Badge -------------------------------------------------------------- */
type BadgeVariant = 'outline' | 'ink' | 'blue' | 'green' | 'positive' | 'danger';
export function Badge({ variant = 'outline', dot = false, children, style = {} }: { variant?: BadgeVariant; dot?: boolean; children: ReactNode; style?: CSSProperties }) {
  const palettes: Record<BadgeVariant, { bg: string; color: string; border: string; dot: string }> = {
    outline: { bg: 'var(--paper)', color: 'var(--text)', border: 'var(--text)', dot: 'var(--text)' },
    ink: { bg: 'var(--ink)', color: 'var(--on-ink)', border: 'var(--ink)', dot: 'var(--blue-bright)' },
    blue: { bg: 'var(--blue-soft)', color: 'var(--blue-deep)', border: 'var(--blue-line)', dot: 'var(--blue)' },
    green: { bg: 'var(--green-soft)', color: 'var(--green-deep)', border: 'var(--green-line)', dot: 'var(--green)' },
    positive: { bg: 'var(--positive-soft)', color: 'var(--positive)', border: 'transparent', dot: 'var(--positive)' },
    danger: { bg: 'var(--danger-soft)', color: 'var(--danger)', border: 'transparent', dot: 'var(--danger)' },
  };
  const p = palettes[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px',
      fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: 1.2,
      color: p.color, background: p.bg, border: `1px solid ${p.border}`,
      borderRadius: 'var(--radius-md)', whiteSpace: 'nowrap', ...style,
    }}>
      {dot && <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: p.dot, flex: 'none' }} />}
      {children}
    </span>
  );
}

/* ---- Eyebrow ------------------------------------------------------------ */
type EyebrowTone = 'blue' | 'muted' | 'onInk';
export function Eyebrow({ index, children, tone = 'blue', rule = false, style = {} }: { index?: number; children: ReactNode; tone?: EyebrowTone; rule?: boolean; style?: CSSProperties }) {
  const color = tone === 'muted' ? 'var(--text-muted)' : tone === 'onInk' ? 'var(--blue-bright)' : 'var(--blue)';
  /* numeral stays quiet/neutral — green is reserved for small functional spots
     (status dots, featured badge, metric gains), never headline-scale */
  const indexColor = tone === 'onInk' ? 'var(--on-ink-muted)' : 'var(--text-faint)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)',
      fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color, ...style,
    }}>
      {index != null && <span style={{ color: indexColor }}>{String(index).padStart(2, '0')}</span>}
      {index != null && <span aria-hidden style={{ color: indexColor, opacity: 0.5 }}>/</span>}
      <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
      {rule && <span aria-hidden style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.25, marginLeft: 4 }} />}
    </div>
  );
}

/* ---- SectionHeader ------------------------------------------------------ */
export function SectionHeader({ index, eyebrow, title, lead, onInk = false, size = 'xl', style = {} }: {
  index?: number; eyebrow?: string; title: ReactNode; lead?: ReactNode; onInk?: boolean; size?: 'lg' | 'xl' | 'xxl'; style?: CSSProperties;
}) {
  const titleSize = size === 'lg' ? 31 : size === 'xxl' ? 54 : 40;
  return (
    <header style={style}>
      <div style={{ height: 1, background: onInk ? 'rgba(246,244,238,0.18)' : 'var(--line)', marginBottom: 22 }} />
      {eyebrow && (
        <div style={{ display: 'flex', marginBottom: 18 }}>
          <Eyebrow index={index} tone={onInk ? 'onInk' : 'blue'}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: titleSize, lineHeight: 1.05,
        letterSpacing: '-0.015em', color: onInk ? 'var(--on-ink)' : 'var(--text)', maxWidth: '24ch', margin: 0,
      }}>{title}</h2>
      {lead && (
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 18, lineHeight: 1.6,
          color: onInk ? 'var(--on-ink-muted)' : 'var(--text-secondary)', marginTop: 18, maxWidth: '52ch',
        }}>{lead}</p>
      )}
    </header>
  );
}

/* ---- BlueprintGrid ------------------------------------------------------ */
export function BlueprintGrid({ cell = 32, axes = false, label, intensity = 'soft', children, style = {} }: {
  cell?: number; axes?: boolean; label?: string; intensity?: 'soft' | 'strong'; children: ReactNode; style?: CSSProperties;
}) {
  const line = intensity === 'strong' ? 'var(--grid-line-strong)' : 'var(--grid-line)';
  return (
    <div style={{
      position: 'relative', backgroundColor: 'var(--canvas)',
      backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
      backgroundSize: `${cell}px ${cell}px`, ...style,
    }}>
      {axes && (
        <>
          <span aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: '20%', height: 1, background: 'rgba(34,76,120,0.16)' }} />
          <span aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: '12%', width: 1, background: 'rgba(34,76,120,0.16)' }} />
        </>
      )}
      {label && (
        <span aria-hidden style={{ position: 'absolute', top: 12, left: 14, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-faint)' }}>{label}</span>
      )}
      {children}
    </div>
  );
}

/* ---- MetricStat / MetricTable ------------------------------------------- */
export type Metric = { label: string; before?: string; after: string; unit?: string; gain?: string };

export function MetricStat({ label, before, after, unit, gain, onInk = false, compact = false }: Metric & { onInk?: boolean; compact?: boolean }) {
  const muted = onInk ? 'var(--on-ink-muted)' : 'var(--text-muted)';
  const ink = onInk ? 'var(--on-ink)' : 'var(--text)';
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10.5 : 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', marginTop: compact ? 7 : 12, lineHeight: 1.12, display: compact ? 'flex' : 'block', alignItems: 'baseline', gap: compact ? 8 : 0, flexWrap: 'wrap' }}>
        {before != null && (
          <div style={{ fontSize: compact ? 12.5 : 14, color: muted, textDecoration: 'line-through', textDecorationColor: 'var(--steel)' }}>{before}</div>
        )}
        <div style={{ fontSize: compact ? 23 : 30, fontWeight: 600, color: ink, letterSpacing: '-0.01em', marginTop: !compact && before != null ? 4 : 0, whiteSpace: 'nowrap' }}>
          {after}{unit && <span style={{ fontSize: compact ? 13 : 15, color: muted, fontWeight: 400, marginLeft: 2 }}>{unit}</span>}
        </div>
      </div>
      {gain && <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 12, fontWeight: 500, color: 'var(--positive)', marginTop: compact ? 5 : 8 }}>{gain}</div>}
    </div>
  );
}

export function MetricTable({ stats, columns, onInk = false, compact = false, style = {} }: { stats: Metric[]; columns?: number; onInk?: boolean; compact?: boolean; style?: CSSProperties }) {
  const cols = columns || Math.min(stats.length || 1, 3);
  const borderCol = onInk ? 'rgba(246,244,238,0.16)' : 'var(--line)';
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, border: `1px solid ${borderCol}`,
      borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: onInk ? 'var(--ink-soft)' : 'var(--paper)', ...style,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: compact ? '13px 16px' : '20px 22px',
          borderRight: (i + 1) % cols === 0 ? 'none' : `1px solid ${borderCol}`,
          borderTop: i >= cols ? `1px solid ${borderCol}` : 'none',
        }}>
          <MetricStat {...s} onInk={onInk} compact={compact} />
        </div>
      ))}
    </div>
  );
}

/* ---- MetricRow — horizontal, bold; the prominent "impact" strip --------- */
export function MetricRow({ stats }: { stats: Metric[] }) {
  return (
    <div className="hoonjo-metric-row" style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 0 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? '1px solid var(--line)' : 'none' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.label}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
            {s.before != null && <span style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'line-through', textDecorationColor: 'var(--steel)' }}>{s.before}</span>}
            <span style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.015em', whiteSpace: 'nowrap' }}>
              {s.after}{s.unit && <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 2 }}>{s.unit}</span>}
            </span>
          </div>
          {s.gain && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: 'var(--positive)', marginTop: 6 }}>{s.gain}</div>}
        </div>
      ))}
    </div>
  );
}

/* ---- TimelineItem ------------------------------------------------------- */
export function TimelineItem({ period, role, org, description, tags = [], current = false, style = {} }: {
  period: string; role: string; org?: string; description?: string; tags?: string[]; current?: boolean; style?: CSSProperties;
}) {
  return (
    <div className="hoonjo-timeline-item" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '150px 1fr', gap: 28, paddingBottom: 40, ...style }}>
      <span aria-hidden style={{
        position: 'absolute', left: -33, top: 6, width: 11, height: 11, borderRadius: 1, transform: 'rotate(45deg)',
        background: current ? 'var(--green)' : 'var(--canvas)', border: `1.5px solid ${current ? 'var(--green)' : 'var(--steel)'}`,
      }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: current ? 'var(--green-deep)' : 'var(--text-muted)', letterSpacing: '0.02em', paddingTop: 3, lineHeight: 1.4 }}>{period}</div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 21, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2, margin: 0 }}>{role}</h4>
          {org && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-muted)' }}>· {org}</span>}
        </div>
        {description && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', marginTop: 10 }}>{description.replace(/\n/g, ' ')}</p>}
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
            {tags.map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xs)', padding: '3px 8px', whiteSpace: 'nowrap' }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- StackList ---------------------------------------------------------- */
export function StackList({ label, items, style = {} }: { label: string; items: string[]; style?: CSSProperties }) {
  return (
    <div style={{ paddingTop: 18, borderTop: '1px solid var(--line)', ...style }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px' }}>
        {items.map((it) => (
          <span key={it} style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, color: 'var(--text)', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xs)', padding: '6px 11px', lineHeight: 1, whiteSpace: 'nowrap' }}>{it}</span>
        ))}
      </div>
    </div>
  );
}
