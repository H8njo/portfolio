import { type CSSProperties, type ReactNode } from 'react';

/* Design-system primitives, ported from the hoonjo-design skill to TypeScript.
   Built with hj-* Tailwind utilities (tokens in app/theme.css). Callers may pass
   `style` for layout overrides (grid placement, margins). */

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

const BTN_VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-hj-blue text-hj-on-blue border-transparent shadow-[0_1px_2px_rgba(27,100,218,0.28)] hover:bg-hj-blue-hover active:bg-hj-blue-deep active:shadow-none active:scale-[0.97]',
  ink: 'bg-hj-ink text-hj-on-ink border-transparent hover:bg-hj-ink-soft active:bg-hj-ink-deep active:scale-[0.97]',
  outline: 'bg-transparent text-hj-blue border-hj-blue hover:bg-hj-blue-soft active:scale-[0.97]',
  'outline-ink': 'bg-transparent text-hj-fg border-hj-fg hover:bg-hj-cloud active:scale-[0.97]',
  text: 'bg-transparent text-hj-blue border-transparent underline-offset-[3px] hover:underline',
};

export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  iconRight,
  children,
  style,
  ...rest
}: ButtonProps) {
  const isText = variant === 'text';
  const sizeCls = isText
    ? 'h-auto py-1 px-0 rounded-none font-hj-mono'
    : `${size === 'sm' ? 'h-[38px] px-4 text-[14px]' : 'h-[46px] px-[22px] text-[15px]'} rounded-hj-button font-hj-serif`;
  const cls = `inline-flex items-center justify-center gap-2 box-border border font-semibold leading-none whitespace-nowrap cursor-pointer transition-[background,color,border-color,transform,box-shadow] duration-150 ${sizeCls} ${BTN_VARIANT[variant]}`;
  const content = (
    <>
      <span>{children}</span>
      {iconRight && <span aria-hidden className="text-[1.05em] leading-[0]">{iconRight}</span>}
    </>
  );
  if (as === 'a') {
    return <a href={href} className={cls} style={style} {...rest}>{content}</a>;
  }
  return <button type="button" className={cls} style={style} {...rest}>{content}</button>;
}

/* ---- Tag ---------------------------------------------------------------- */
type TagVariant = 'outline' | 'solid' | 'blue' | 'ghost';
const TAG_VARIANT: Record<TagVariant, string> = {
  // fog fill + steel border — matches the /work list chips. near-white 캔버스에서
  // 투명+line 테두리 칩이 묻히던 걸 또렷하게(전 라우트 동일).
  outline: 'bg-hj-fog text-hj-fg-secondary border-hj-steel',
  solid: 'bg-hj-ink text-hj-on-ink border-hj-ink',
  blue: 'bg-hj-blue-soft text-hj-blue-deep border-hj-blue-line',
  ghost: 'bg-hj-fog text-hj-fg-secondary border-hj-steel',
};
export function Tag({ variant = 'outline', children, style }: { variant?: TagVariant; children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={style}
      className={`inline-flex items-center h-6 px-2 font-hj-mono text-[12px] font-medium tracking-[0.02em] leading-none border rounded-hj-xs whitespace-nowrap ${TAG_VARIANT[variant]}`}
    >{children}</span>
  );
}

/* ---- Badge -------------------------------------------------------------- */
type BadgeVariant = 'outline' | 'ink' | 'blue' | 'green' | 'positive' | 'danger';
const BADGE_VARIANT: Record<BadgeVariant, { box: string; dot: string }> = {
  outline: { box: 'bg-hj-paper text-hj-fg border-hj-fg', dot: 'bg-hj-fg' },
  ink: { box: 'bg-hj-ink text-hj-on-ink border-hj-ink', dot: 'bg-hj-blue-bright' },
  blue: { box: 'bg-hj-blue-soft text-hj-blue-deep border-hj-blue-line', dot: 'bg-hj-blue' },
  green: { box: 'bg-hj-green-soft text-hj-green-deep border-hj-green-line', dot: 'bg-hj-green' },
  positive: { box: 'bg-hj-positive-soft text-hj-positive border-transparent', dot: 'bg-hj-positive' },
  danger: { box: 'bg-hj-danger-soft text-hj-danger border-transparent', dot: 'bg-hj-danger' },
};
export function Badge({ variant = 'outline', dot = false, children, style }: { variant?: BadgeVariant; dot?: boolean; children: ReactNode; style?: CSSProperties }) {
  const p = BADGE_VARIANT[variant];
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1.5 px-[11px] py-[5px] font-hj-serif text-[13px] font-medium leading-[1.2] border rounded-hj-md whitespace-nowrap ${p.box}`}
    >
      {dot && <span aria-hidden className={`h-1.5 w-1.5 rounded-full shrink-0 ${p.dot}`} />}
      {children}
    </span>
  );
}

/* ---- Eyebrow ------------------------------------------------------------ */
type EyebrowTone = 'blue' | 'muted' | 'onInk';
export function Eyebrow({ index, children, tone = 'blue', rule = false, style }: { index?: number; children: ReactNode; tone?: EyebrowTone; rule?: boolean; style?: CSSProperties }) {
  const color = tone === 'muted' ? 'text-hj-muted' : tone === 'onInk' ? 'text-hj-blue-bright' : 'text-hj-blue';
  /* numeral stays quiet/neutral — green is reserved for small functional spots */
  const indexColor = tone === 'onInk' ? 'text-hj-on-ink-muted' : 'text-hj-faint';
  return (
    <div style={style} className={`flex items-center gap-2.5 font-hj-mono text-[12px] font-medium tracking-[0.14em] uppercase ${color}`}>
      {index != null && <span className={indexColor}>{String(index).padStart(2, '0')}</span>}
      {index != null && <span aria-hidden className={`${indexColor} opacity-50`}>/</span>}
      <span className="whitespace-nowrap">{children}</span>
      {rule && <span aria-hidden className="flex-1 h-px bg-current opacity-25 ml-1" />}
    </div>
  );
}

/* ---- SectionHeader ------------------------------------------------------ */
export function SectionHeader({ index, eyebrow, title, lead, onInk = false, size = 'xl', style }: {
  index?: number; eyebrow?: string; title: ReactNode; lead?: ReactNode; onInk?: boolean; size?: 'lg' | 'xl' | 'xxl'; style?: CSSProperties;
}) {
  // clamp so section titles scale down on mobile — a fixed 40px stayed larger than
  // the hero H1 (which clamps to 30px) on small screens, inverting the hierarchy.
  const titleSize = size === 'lg' ? 'text-[clamp(24px,3.4vw,31px)]' : size === 'xxl' ? 'text-[clamp(34px,5vw,54px)]' : 'text-[clamp(28px,4.2vw,40px)]';
  return (
    <header style={style}>
      <div className={`h-px mb-[22px] ${onInk ? 'bg-[rgba(246,244,238,0.18)]' : 'bg-hj-line'}`} />
      {eyebrow && (
        <div className="flex mb-[18px]">
          <Eyebrow index={index} tone={onInk ? 'onInk' : 'blue'}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className={`max-w-[24ch] font-hj-serif ${titleSize} font-semibold leading-[1.05] tracking-[-0.015em] ${onInk ? 'text-hj-on-ink' : 'text-hj-fg'}`}>{title}</h2>
      {lead && (
        <p className={`mt-[18px] max-w-[52ch] font-hj-serif text-[18px] leading-[1.6] ${onInk ? 'text-hj-on-ink-muted' : 'text-hj-fg-secondary'}`}>{lead}</p>
      )}
    </header>
  );
}

/* ---- BlueprintGrid ------------------------------------------------------ */
export function BlueprintGrid({ cell = 32, axes = false, label, intensity = 'soft', children, style }: {
  cell?: number; axes?: boolean; label?: string; intensity?: 'soft' | 'strong'; children: ReactNode; style?: CSSProperties;
}) {
  /* backgroundImage/size are computed from `cell`/`intensity` props → stay inline.
     Uses theme.css hj tokens so it survives hoonjo.css deletion. */
  const line = intensity === 'strong' ? 'rgba(49,130,246,0.035)' : 'rgba(49,130,246,0.018)';
  return (
    <div
      className="relative bg-hj-canvas"
      style={{
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: `${cell}px ${cell}px`,
        ...style,
      }}
    >
      {axes && (
        <>
          <span aria-hidden className="absolute left-0 right-0 top-[20%] h-px bg-[rgba(34,76,120,0.16)]" />
          <span aria-hidden className="absolute top-0 bottom-0 left-[12%] w-px bg-[rgba(34,76,120,0.16)]" />
        </>
      )}
      {label && (
        <span aria-hidden className="absolute top-3 left-3.5 font-hj-mono text-[10px] tracking-[0.08em] text-hj-faint">{label}</span>
      )}
      {children}
    </div>
  );
}

/* ---- MetricStat / MetricTable ------------------------------------------- */
export type Metric = { label: string; before?: string; after: string; unit?: string; gain?: string };

export function MetricStat({ label, before, after, unit, gain, onInk = false, compact = false }: Metric & { onInk?: boolean; compact?: boolean }) {
  const muted = onInk ? 'text-hj-on-ink-muted' : 'text-hj-muted';
  const ink = onInk ? 'text-hj-on-ink' : 'text-hj-fg';
  return (
    <div>
      <div className={`font-hj-mono ${compact ? 'text-[10.5px]' : 'text-[11px]'} font-medium tracking-[0.08em] uppercase ${muted}`}>{label}</div>
      <div className={`font-hj-mono tabular-nums leading-[1.12] ${compact ? 'mt-[7px] flex items-baseline gap-2 flex-wrap' : 'mt-3 block'}`}>
        {before != null && (
          <div className={`${compact ? 'text-[12.5px]' : 'text-[14px]'} ${muted} line-through decoration-hj-steel`}>{before}</div>
        )}
        <div className={`${compact ? 'text-[23px]' : 'text-[30px]'} font-semibold ${ink} tracking-[-0.01em] whitespace-nowrap ${!compact && before != null ? 'mt-1' : ''}`}>
          {after}{unit && <span className={`${compact ? 'text-[13px]' : 'text-[15px]'} ${muted} font-normal ml-0.5`}>{unit}</span>}
        </div>
      </div>
      {gain && <div className={`font-hj-mono ${compact ? 'text-[11px] mt-[5px]' : 'text-[12px] mt-2'} font-medium text-hj-positive`}>{gain}</div>}
    </div>
  );
}

export function MetricTable({ stats, columns, onInk = false, compact = false, style }: { stats: Metric[]; columns?: number; onInk?: boolean; compact?: boolean; style?: CSSProperties }) {
  const cols = columns || Math.min(stats.length || 1, 3);
  const bc = onInk ? 'border-[rgba(246,244,238,0.16)]' : 'border-hj-line';
  return (
    <div
      className={`grid border ${bc} rounded-hj-lg overflow-hidden ${onInk ? 'bg-hj-ink-soft' : 'bg-hj-paper'}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, ...style }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className={`${compact ? 'px-4 py-[13px]' : 'px-[22px] py-5'} ${(i + 1) % cols !== 0 ? `border-r ${bc}` : ''} ${i >= cols ? `border-t ${bc}` : ''}`}
        >
          <MetricStat {...s} onInk={onInk} compact={compact} />
        </div>
      ))}
    </div>
  );
}

/* ---- MetricRow — horizontal, bold; the prominent "impact" strip --------- */
export function MetricRow({ stats }: { stats: Metric[] }) {
  return (
    <div className="grid gap-0 max-[560px]:grid-cols-1!" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
      {stats.map((s, i) => (
        <div key={i} className={i > 0 ? 'pl-6 border-l border-hj-line max-[560px]:pl-0 max-[560px]:border-l-0 max-[560px]:pt-3.5 max-[560px]:mt-3.5 max-[560px]:border-t max-[560px]:border-hj-line' : ''}>
          <div className="font-hj-mono text-[10.5px] font-medium tracking-[0.08em] uppercase text-hj-muted">{s.label}</div>
          <div className="font-hj-mono tabular-nums mt-2 flex items-baseline gap-2 flex-wrap">
            {s.before != null && <span className="text-[13px] text-hj-muted line-through decoration-hj-steel">{s.before}</span>}
            {s.before != null && <span aria-hidden className="text-[14px] text-hj-faint">→</span>}
            <span className="text-[26px] font-bold text-hj-fg tracking-[-0.015em] whitespace-nowrap">
              {s.after}{s.unit && <span className="text-[13px] font-normal text-hj-muted ml-0.5">{s.unit}</span>}
            </span>
          </div>
          {s.gain && <div className="font-hj-mono text-[11px] font-medium text-hj-positive mt-1.5">{s.gain}</div>}
        </div>
      ))}
    </div>
  );
}

/* ---- TimelineItem ------------------------------------------------------- */
export function TimelineItem({ period, role, org, description, tags = [], current = false, style }: {
  period: string; role: string; org?: string; description?: string; tags?: string[]; current?: boolean; style?: CSSProperties;
}) {
  return (
    <div className="relative grid grid-cols-[150px_1fr] gap-7 pb-10 max-[560px]:grid-cols-1 max-[560px]:gap-1.5" style={style}>
      <span aria-hidden className={`absolute -left-[33px] top-1.5 w-[11px] h-[11px] rounded-[1px] rotate-45 border-[1.5px] ${current ? 'bg-hj-green border-hj-green' : 'bg-hj-canvas border-hj-steel'}`} />
      <div className={`font-hj-mono text-[13px] font-medium tracking-[0.02em] pt-[3px] leading-[1.4] ${current ? 'text-hj-green-deep' : 'text-hj-muted'}`}>{period}</div>
      <div>
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h4 className="font-hj-serif text-[21px] font-semibold text-hj-fg leading-[1.2]">{role}</h4>
          {org && <span className="font-hj-serif text-[15px] text-hj-muted">· {org}</span>}
        </div>
        {description && <p className="font-hj-serif text-[15px] leading-[1.6] text-hj-fg-secondary mt-2.5">{description.replace(/\n/g, ' ')}</p>}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {tags.map((t) => (
              <span key={t} className="font-hj-mono text-[12px] text-hj-fg-secondary bg-hj-fog border border-hj-steel rounded-hj-xs px-2 py-[3px] whitespace-nowrap">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- StackList ---------------------------------------------------------- */
export function StackList({ label, items, style }: { label: string; items: string[]; style?: CSSProperties }) {
  return (
    <div className="pt-[18px] border-t border-hj-line" style={style}>
      <div className="font-hj-mono text-[11px] font-medium tracking-[0.1em] uppercase text-hj-muted mb-3.5">{label}</div>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2">
        {items.map((it) => (
          <span key={it} className="font-hj-mono text-[13.5px] text-hj-fg bg-hj-fog border border-hj-steel rounded-hj-xs px-[11px] py-1.5 leading-none whitespace-nowrap">{it}</span>
        ))}
      </div>
    </div>
  );
}
