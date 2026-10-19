import { useState } from 'react'
import { ExternalLink, RotateCcw } from 'lucide-react'
import screens from '../data/screens.json'
import { useDemo } from '../state'
import { LangToggle } from '../components/ui'
import { appUrl } from '../config'

/** Every screen in a 390×844 phone frame, labelled, for screenshotting into the deck. */
export default function Gallery() {
  const { reset } = useDemo()
  const [nonce, setNonce] = useState(0)
  const groups = [...new Set(screens.map(s => s.group))]

  return (
    <div className="min-h-dvh bg-[#efece5] px-6 pb-16 pt-8">
      <header className="mx-auto flex max-w-[1800px] flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[.1em] text-muted">MKTG 113 · Group 4 · SEDPI</p>
          <h1 className="mt-1 text-[40px] font-extrabold leading-none">Usapang Pera: Unang Hakbang</h1>
          <p className="mt-2 max-w-xl text-[15px] text-muted">Mobile-first KaSosyo site prototype. Bawat frame ay live at clickable, sa 390×844. Ang language toggle ay para sa lahat ng frame.</p>
        </div>
        <div className="flex items-center gap-3">
          <LangToggle className="h-11 [&>button]:px-4 [&>button]:text-[14px]" />
          <button
            onClick={() => { reset(); setNonce(n => n + 1) }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-teal px-4 text-[14px] font-semibold text-teal"
          >
            <RotateCcw size={16} /> I-reset ang demo
          </button>
        </div>
      </header>

      {groups.map(g => (
        <section key={g} className="mx-auto mt-10 max-w-[1800px]">
          <h2 className="border-b border-ink/15 pb-2 text-[20px] font-bold">{g}</h2>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-10">
            {screens.filter(s => s.group === g).map(s => (
              <figure key={s.id} className="shrink-0">
                <div className="overflow-hidden rounded-[44px] border-[10px] border-ink bg-paper shadow-xl">
                  <iframe key={nonce} src={appUrl(s.path)} title={s.label} width={390} height={844} className="block border-0" />
                </div>
                <figcaption className="mt-3 flex items-center justify-between px-2">
                  <span className="text-[15px] font-semibold">{s.label}</span>
                  <a href={appUrl(s.path)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 font-mono text-[12.5px] text-muted hover:text-teal">
                    {s.path.split('?')[0]} <ExternalLink size={13} />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
