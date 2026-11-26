import { useState } from 'react'
import { Play } from 'lucide-react'
import { HERO_VIDEO_META, HERO_VIDEO_URL, youtubeEmbed, youtubeThumb } from '../config'
import { useT } from '../state'
import { Photo, Sheet, TBC } from './ui'

/** The landing page's "watch this first" video, on SEDPI's coral-and-teal wave. */
export function VideoHero() {
  const { t } = useT()
  const [playing, setPlaying] = useState(false)
  const [outline, setOutline] = useState(false)
  const embed = HERO_VIDEO_URL ? youtubeEmbed(HERO_VIDEO_URL) : null
  const thumb = HERO_VIDEO_URL ? youtubeThumb(HERO_VIDEO_URL) : null
  const chapters = [
    t('videoHero.what_is_kasosyo'),
    t('videoHero.how_to_join_1_100'),
    t('videoHero.first_investment_10_000'),
    t('videoHero.is_it_safe'),
  ]
  const play = () => (embed ? setPlaying(true) : setOutline(true))

  return (
    <div>
      {/* Brand panel: coral with a teal wave, echoing SEDPI's Usapang Pera visuals */}
      <div className="relative overflow-hidden rounded-[28px] bg-coral p-2.5">
        <svg aria-hidden viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <path d="M100 8 C70 14 62 44 30 60 L100 60 Z" fill="var(--color-teal-brand)" />
        </svg>
        <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ink">
          {playing && embed ? (
            <iframe
              src={embed}
              title={t('videoHero.how_to_join_and_start_investing')}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="size-full border-0"
            />
          ) : (
            <button onClick={play} className="group absolute inset-0" aria-label={t('videoHero.play_the_video')}>
              {thumb ? (
                <img src={thumb} alt="" loading="eager" className="size-full object-cover" />
              ) : (
                <Photo slot="hero-video" quiet className="size-full" />
              )}
              <span className="absolute inset-0 bg-ink/15 transition group-hover:bg-ink/5" />
              <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-coral-strong shadow-xl transition group-active:scale-95">
                <Play size={28} fill="currentColor" className="ml-1" />
              </span>
              <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/65 px-1.5 py-0.5 text-[11px] font-bold text-white">
                {HERO_VIDEO_META.length}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <div>
          <p className="font-display text-[18px] font-bold leading-tight">{t('videoHero.how_to_join_and_start_investing')}</p>
          {HERO_VIDEO_META.placeholder && (
            <p className="mt-0.5 text-[12px] text-muted">
              {t('videoHero.placeholder_video')}: Usapang Pera · “{HERO_VIDEO_META.title}”
            </p>
          )}
        </div>
        <span className="shrink-0 rounded-full bg-mangga px-2.5 py-1 text-[11.5px] font-bold text-ink">{t('videoHero.for_first_timers')}</span>
      </div>

      <ol className="snap-row -mx-5 mt-3 flex gap-2 overflow-x-auto px-5" aria-label={t('videoHero.whats_in_the_video')}>
        {chapters.map((c, i) => (
          <li key={c} className="shrink-0">
            <button onClick={() => setOutline(true)} className="flex min-h-10 items-center gap-2 rounded-full border border-line bg-card py-1 pl-1 pr-3 text-[12.5px] font-semibold">
              <span className="grid size-7 place-items-center rounded-full bg-teal-tint font-display text-[12px] font-bold text-teal">{i + 1}</span>
              {c}
            </button>
          </li>
        ))}
      </ol>

      <Sheet open={outline} onClose={() => setOutline(false)} title={t('videoHero.the_video_in_short')}>
        {!embed && (
          <p className="text-[14px] text-muted">
            <TBC>[{t('videoHero.sedpis_video_goes_here')} — src/config.ts]</TBC>
          </p>
        )}
        <ol className="mt-2 grid gap-3">
          {[
            t('videoHero.kasosyo_is_sedpis_co_op_members'),
            t('videoHero.to_join_watch_the_short_pmes'),
            t('videoHero.to_invest_choose_a_jvs_from'),
            t('videoHero.the_co_op_is_cda_registered'),
          ].map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="stone grid size-8 shrink-0 place-items-center bg-teal-tint font-display text-[13px] font-bold text-teal">{i + 1}</span>
              <p className="text-[14.5px] leading-snug">{line}</p>
            </li>
          ))}
        </ol>
        {embed && (
          <button onClick={() => { setOutline(false); setPlaying(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-coral-strong font-semibold text-white">
            <Play size={17} fill="currentColor" /> {t('videoHero.watch_the_video')}
          </button>
        )}
      </Sheet>
    </div>
  )
}
