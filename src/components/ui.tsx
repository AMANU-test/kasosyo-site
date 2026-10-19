import { useEffect, useState, type ButtonHTMLAttributes, type ComponentType, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, ChevronLeft, MessageCircle, X, Image as ImageIcon, type LucideProps } from 'lucide-react'
import { useDemo, useT } from '../state'
import { photos, type PhotoSlot } from '../data/photos'

/* ---------- Layout ---------- */

/** Phone-width column. On desktop it sits centred on a quiet backdrop. */
export function Screen({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-paper shadow-[0_0_0_1px_rgba(0,0,0,.04)] ${className}`}>
      {children}
    </div>
  )
}

export function TopBar({ title, back, right }: { title?: ReactNode; back?: string | true; right?: ReactNode }) {
  const nav = useNavigate()
  const { t } = useT()
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-1 border-b border-line/70 bg-paper/95 px-2 backdrop-blur">
      {back ? (
        <button
          aria-label={t('Bumalik', 'Back')}
          onClick={() => (back === true ? nav(-1) : nav(back))}
          className="grid size-11 place-items-center rounded-full text-ink hover:bg-teal-soft"
        >
          <ChevronLeft size={22} />
        </button>
      ) : (
        <Wordmark />
      )}
      <div className="min-w-0 flex-1 truncate text-[15px] font-semibold">{title}</div>
      <LangToggle />
      {right}
    </header>
  )
}

/** Placeholder brand mark in SEDPI's colours (swap for the official logo when available). */
export function Wordmark() {
  return (
    <Link to="/" className="flex h-11 items-center gap-2 px-2" aria-label="KaSosyo home">
      <span className="grid grid-cols-2 gap-[3px]" aria-hidden>
        <i className="size-[7px] rounded-full bg-coral" />
        <i className="size-[7px] rounded-full bg-mangga" />
        <i className="size-[7px] rounded-full bg-teal-brand" />
        <i className="size-[7px] rounded-full bg-sexy-e" />
      </span>
      <span className="font-display text-[17px] font-bold tracking-tight text-teal">KaSosyo</span>
    </Link>
  )
}

/** Taglish / English switch. Lives in every header. */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useT()
  return (
    <div role="group" aria-label="Language / Wika" className={`flex h-8 shrink-0 items-center rounded-full border border-line bg-card p-0.5 text-[12px] font-bold ${className}`}>
      {(['tl', 'en'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative h-full rounded-full px-2.5 transition after:absolute after:-inset-y-2 after:inset-x-0 after:content-[''] ${lang === l ? 'bg-teal text-white' : 'text-muted'}`}
        >
          {l === 'tl' ? 'Taglish' : 'English'}
        </button>
      ))}
    </div>
  )
}

/** A real photo from SEDPI if public/photos/<file> exists, otherwise a labelled placeholder (`quiet` drops the label when overlays would cover it). */
export function Photo({ slot, className = '', children, compact, quiet }: { slot: PhotoSlot; className?: string; children?: ReactNode; compact?: boolean; quiet?: boolean }) {
  const { tx, t } = useT()
  const p = photos[slot]
  const [ok, setOk] = useState<boolean | null>(null)
  return (
    <div className={`relative overflow-hidden bg-placeholder ${className}`}>
      {ok !== false && (
        <img
          src={`${import.meta.env.BASE_URL}photos/${p.file}`}
          alt={tx(p.alt)}
          loading="lazy"
          decoding="async"
          onLoad={() => setOk(true)}
          onError={() => setOk(false)}
          style={{ objectPosition: p.pos }}
          className={`absolute inset-0 size-full object-cover ${ok ? '' : 'opacity-0'}`}
        />
      )}
      {!ok && !quiet && (
        <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgba(0,0,0,.025)_10px_20px)] p-2 text-center">
          <span className="flex flex-col items-center gap-1 text-muted">
            <ImageIcon size={compact ? 16 : 20} aria-hidden />
            {!compact && <span className="text-[11.5px] font-semibold leading-tight">[{t('Kailangan ng photo', 'Photo needed')}]</span>}
            <span className={`leading-tight ${compact ? 'text-[9.5px]' : 'text-[11px]'}`}>{p.hint}</span>
          </span>
        </div>
      )}
      {children}
    </div>
  )
}

/* ---------- Buttons ---------- */

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'accent'; full?: boolean }

const btnBase = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-[15px] font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-45'
const btnVariants = {
  primary: 'bg-coral-strong text-white hover:bg-[#c02d34]',
  accent: 'bg-mangga text-ink hover:brightness-95',
  secondary: 'border-2 border-teal/80 bg-transparent text-teal hover:bg-teal-soft',
  ghost: 'text-teal underline-offset-4 hover:underline',
}

export function Button({ variant = 'primary', full, className = '', ...p }: BtnProps) {
  return <button className={`${btnBase} ${btnVariants[variant]} ${full ? 'w-full' : ''} ${className}`} {...p} />
}

export function LinkButton({ to, variant = 'primary', full, className = '', children }: { to: string; variant?: BtnProps['variant']; full?: boolean; className?: string; children: ReactNode }) {
  return <Link to={to} className={`${btnBase} ${btnVariants[variant]} ${full ? 'w-full' : ''} ${className}`}>{children}</Link>
}

/** Sticky bottom action bar: thumb reach on phones. */
export function StickyBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-20 mt-auto border-t border-line/70 bg-paper/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      {children}
    </div>
  )
}

/* ---------- Content bits ---------- */

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-line bg-card p-4 ${className}`}>{children}</div>
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-[12px] font-semibold uppercase tracking-[.08em] text-muted ${className}`}>{children}</p>
}

/** Grey labelled box for anything SEDPI still has to supply. */
export function Placeholder({ label, className = '', icon = true }: { label: string; className?: string; icon?: boolean }) {
  return (
    <div className={`grid place-items-center rounded-2xl border border-dashed border-[#b9c0b8] bg-placeholder text-center text-[12px] font-medium text-muted ${className}`}>
      <span className="flex flex-col items-center gap-1 px-2">
        {icon && <ImageIcon size={18} aria-hidden />}
        {label}
      </span>
    </div>
  )
}

/** Small "confirm with SEDPI" marker text. */
export function TBC({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-placeholder px-1.5 py-0.5 font-mono text-[11.5px] text-muted">{children}</span>
}

export const SEXY = {
  S: { word: 'Secure', fil: 'Ligtas', plain: 'Safe', color: 'bg-sexy-s', text: 'text-sexy-s' },
  E: { word: 'Encashable', fil: 'Makukuha', plain: 'Withdrawable', color: 'bg-sexy-e', text: 'text-sexy-e' },
  X: { word: 'X-factor', fil: 'May epekto', plain: 'Impact', color: 'bg-sexy-x', text: 'text-sexy-x' },
  Y: { word: 'Yield', fil: 'Kita', plain: 'Returns', color: 'bg-sexy-y', text: 'text-sexy-y' },
} as const
export type SexyLetter = keyof typeof SEXY

export function SexyBadge({ letter, size = 'md' }: { letter: SexyLetter; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 'size-7 text-[13px]' : size === 'lg' ? 'size-12 text-[22px]' : 'size-9 text-[16px]'
  return (
    <span aria-label={SEXY[letter].word} className={`stone grid shrink-0 place-items-center font-display font-extrabold text-white ${SEXY[letter].color} ${s}`}>
      {letter}
    </span>
  )
}

/** A big icon on a tinted tile: the house style for explainer visuals. */
export function IconScene({ icon: Icon, tint = 'bg-teal-tint', fg = 'text-teal', className = '', accent }: { icon: ComponentType<LucideProps>; tint?: string; fg?: string; className?: string; accent?: ComponentType<LucideProps> }) {
  const Accent = accent
  return (
    <div className={`relative grid place-items-center overflow-hidden rounded-3xl ${tint} ${className}`} aria-hidden>
      <span className="stone absolute -left-6 -top-8 size-28 bg-white/35" />
      <span className="stone absolute -bottom-10 -right-4 size-32 bg-white/25" />
      <Icon className={`relative ${fg}`} size={64} strokeWidth={1.5} />
      {Accent && (
        <span className="absolute bottom-4 right-[calc(50%-58px)] grid size-11 place-items-center rounded-full bg-white shadow-sm">
          <Accent className={fg} size={22} strokeWidth={2} />
        </span>
      )}
    </div>
  )
}

/* ---------- Stepping stones: the "hakbang" signature ---------- */

export function Stones({ steps, current, done, compact }: { steps: string[]; current: number; done: (i: number) => boolean; compact?: boolean }) {
  const size = compact ? 'size-8 text-[13px]' : 'size-11 text-[15px]'
  return (
    <ol className="relative flex items-start justify-between" aria-label="Mga hakbang">
      <span aria-hidden className={`absolute inset-x-[8%] border-t-2 border-dashed border-teal/30 ${compact ? 'top-4' : 'top-[22px]'}`} />
      {steps.map((label, i) => {
        const isDone = done(i)
        const isCur = i === current
        return (
          <li key={label} className="relative z-10 flex flex-1 flex-col items-center gap-1.5" aria-current={isCur ? 'step' : undefined}>
            <span
              className={`stone grid ${size} place-items-center font-display font-bold transition ${
                isDone ? 'bg-teal text-white' : isCur ? 'bg-mangga text-ink ring-4 ring-mangga/30' : 'border-2 border-teal/25 bg-paper text-muted'
              }`}
              style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 8}deg)` }}
            >
              {isDone ? <Check size={compact ? 15 : 18} strokeWidth={3} /> : i + 1}
            </span>
            <span className={`text-center leading-tight ${compact ? 'text-[11px]' : 'text-[12px]'} ${isCur ? 'font-semibold text-ink' : 'text-muted'}`}>{label}</span>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Bottom sheet ---------- */

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={e => e.stopPropagation()}
        className="rise max-h-[88dvh] w-full max-w-[430px] overflow-y-auto rounded-t-[28px] bg-paper px-4 pb-6 pt-3"
      >
        <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-line" />
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[20px] font-bold">{title}</h2>
          <button aria-label="Close / Isara" onClick={onClose} className="grid size-11 place-items-center rounded-full hover:bg-teal-soft">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ---------- Messenger (fake link) ---------- */

export function useMessenger() {
  const { toast } = useDemo()
  const { t } = useT()
  return () => toast(t('Sa totoong site, bubuksan nito ang Messenger chat ng SEDPI.', "On the real site, this opens SEDPI's Messenger chat.") + ' [m.me link — confirm with SEDPI]')
}

/** Floating "Chat kay Zion" button for the sign-up wizard. Sits above the sticky bar. */
export function ChatFab({ bottom = 92 }: { bottom?: number }) {
  const [open, setOpen] = useState(false)
  const openMessenger = useMessenger()
  const { t } = useT()
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed z-30 flex min-h-12 items-center gap-2 rounded-full bg-ink py-1.5 pl-1.5 pr-3.5 text-left text-white shadow-lg"
        style={{ bottom, right: 'max(12px, calc(50vw - 215px + 12px))' }}
        aria-label={t('May tanong? Chat kay Zion', 'Questions? Chat with Zion')}
      >
        <span className="grid size-9 place-items-center rounded-full bg-mangga text-ink"><MessageCircle size={18} /></span>
        <span className="leading-tight">
          <span className="block text-[11px] text-white/75">{t('May tanong?', 'Questions?')}</span>
          <span className="block text-[13px] font-semibold">{t('Chat kay Zion', 'Chat with Zion')}</span>
        </span>
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title={t('Si Zion ang sasagot', 'Zion will answer you')}>
        <div className="flex gap-3">
          <Photo slot="zion" compact className="size-16 shrink-0 rounded-full" />
          <p className="text-[15px] leading-relaxed text-muted">
            {t(
              'Si Zion ang member-relations officer ng SEDPI Coop. Tao siya, hindi bot. Itanong mo kahit ano: tungkol sa co-op, sa bayad, o kung para sa iyo ba ito.',
              "Zion is SEDPI Coop's member-relations officer. A real person, not a bot. Ask anything: about the co-op, the payment, or whether this is right for you.",
            )}
          </p>
        </div>
        <div className="mt-4 grid gap-2">
          <Button full onClick={() => { openMessenger(); setOpen(false) }}><MessageCircle size={18} /> {t('Mag-message kay Zion', 'Message Zion')}</Button>
          <Button full variant="ghost" onClick={() => setOpen(false)}>{t('Mamaya na lang', 'Maybe later')}</Button>
        </div>
        <p className="mt-2 text-center text-[12px] text-muted">{t('Oras ng sagot:', 'Reply hours:')} <TBC>[office hours — confirm with SEDPI]</TBC></p>
      </Sheet>
    </>
  )
}

/* ---------- Choice chips (radio-like) ---------- */

export function ChoiceCard({ selected, onClick, children, className = '' }: { selected: boolean; onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`relative rounded-2xl border-2 p-3 text-left transition ${selected ? 'border-teal bg-teal-soft' : 'border-line bg-card hover:border-teal/40'} ${className}`}
    >
      {selected && (
        <span className="absolute right-2.5 top-2.5 grid size-6 place-items-center rounded-full bg-teal text-white"><Check size={14} strokeWidth={3} /></span>
      )}
      {children}
    </button>
  )
}

export function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border border-line bg-card p-3">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="peer sr-only" />
      <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border-2 transition peer-focus-visible:ring-4 peer-focus-visible:ring-mangga ${checked ? 'border-teal bg-teal text-white' : 'border-[#9aa7a1] bg-white'}`}>
        {checked && <Check size={15} strokeWidth={3} />}
      </span>
      <span className="text-[14.5px] leading-snug">{children}</span>
    </label>
  )
}
