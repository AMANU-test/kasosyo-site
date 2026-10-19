import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import QRCode from 'qrcode'
import { LayoutGrid, Smartphone } from 'lucide-react'
import { appUrl } from '../config'
import { useT } from '../state'
import { LangToggle, Wordmark } from './ui'

const inFrame = window.self !== window.top
const PHONE_W = 390
const PHONE_H = 844
const BEZEL = 12

function useWide() {
  const q = '(min-width: 900px)'
  const [wide, setWide] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

/** Shrinks the phone to fit short laptop screens. */
function usePhoneScale() {
  const calc = () => Math.min(1, (window.innerHeight - 48) / (PHONE_H + BEZEL * 2))
  const [scale, setScale] = useState(calc)
  useEffect(() => {
    const on = () => setScale(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return scale
}

/**
 * On a phone, the site renders as-is. On a laptop, it renders inside one phone frame
 * with a QR code beside it, so a reviewer can see the mobile site or scan it.
 */
export function DesktopShell({ children }: { children: ReactNode }) {
  const wide = useWide()
  const { pathname, search } = useLocation()
  if (inFrame || !wide || pathname.startsWith('/gallery')) return <>{children}</>
  return <PhoneStage start={pathname + search} />
}

function PhoneStage({ start }: { start: string }) {
  const { t } = useT()
  const scale = usePhoneScale()
  const [src] = useState(() => appUrl(start)) // fixed at mount; navigation happens inside the phone
  const siteUrl = window.location.origin + appUrl('/')
  const isLocal = /^(localhost|127\.|\[::1\])/.test(window.location.hostname)
  const [qr, setQr] = useState('')
  useEffect(() => {
    QRCode.toString(siteUrl, { type: 'svg', margin: 0, color: { dark: '#152420', light: '#0000' } }).then(setQr)
  }, [siteUrl])

  const frameW = PHONE_W + BEZEL * 2
  const frameH = PHONE_H + BEZEL * 2

  return (
    <div className="flex min-h-dvh items-center justify-center gap-16 bg-[#efece5] px-10 py-6">
      <div style={{ width: frameW * scale, height: frameH * scale }} className="shrink-0">
        <div
          className="origin-top-left overflow-hidden rounded-[56px] bg-ink shadow-[0_30px_80px_-20px_rgba(31,93,102,.45)]"
          style={{ width: frameW, height: frameH, padding: BEZEL, transform: `scale(${scale})` }}
        >
          <iframe
            src={src}
            title="KaSosyo"
            className="block rounded-[44px] border-0 bg-paper"
            style={{ width: PHONE_W, height: PHONE_H }}
          />
        </div>
      </div>

      <aside className="max-w-[340px]">
        <Wordmark />
        <h1 className="mt-4 text-[34px] font-extrabold leading-[1.05]">Usapang Pera: Unang Hakbang</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          {t(
            'Mobile-first na KaSosyo site. Subukan dito sa phone sa kaliwa, o i-scan para buksan sa sarili mong phone.',
            'A mobile-first KaSosyo site. Try it in the phone on the left, or scan to open it on your own phone.',
          )}
        </p>

        <div className="mt-6 flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm">
          <div className="size-32 shrink-0" aria-label={t('QR code ng site', 'QR code for the site')} role="img" dangerouslySetInnerHTML={{ __html: qr }} />
          <div>
            <p className="flex items-center gap-1.5 text-[14px] font-bold"><Smartphone size={16} /> {t('I-scan gamit ang camera', 'Scan with your camera')}</p>
            <p className="mt-1 break-all font-mono text-[11.5px] text-muted">{siteUrl.replace(/^https?:\/\//, '')}</p>
            {isLocal && (
              <p className="mt-2 text-[11.5px] leading-snug text-sexy-x">
                {t('Localhost ito, kaya gagana lang ang QR kapag naka-deploy na.', 'This is localhost, so the QR only works once the site is deployed.')}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <LangToggle className="h-10 [&>button]:px-3.5 [&>button]:text-[13px]" />
          <a href={appUrl('/gallery')} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border-2 border-teal/70 px-3.5 text-[13px] font-semibold text-teal">
            <LayoutGrid size={15} /> {t('Lahat ng screen', 'All screens')}
          </a>
        </div>
        <p className="mt-6 text-[12px] text-muted">MKTG 113 · Group 4 · {t('Prototype para sa', 'Prototype for')} SEDPI</p>
      </aside>
    </div>
  )
}
