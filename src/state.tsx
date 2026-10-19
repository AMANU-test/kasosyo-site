import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

export type Lang = 'tl' | 'en'

/** A piece of copy in both languages. */
export type Txt = { tl: string; en: string }

/** Everything the prototype remembers. No backend: it lives in localStorage. */
export type DemoState = {
  lang: Lang
  lessonsDone: string[]
  goal: { label: string; amount: number }
  streakWeeks: number
  impactPicks: string[]
  chaptersDone: number[]
  profile: { name: string; email: string; mobile: string; sfi: boolean }
  agreed: boolean
  receipt: string | null
  messengerOptIn: boolean
  jvs: { goal: 'near' | 'medium' | 'far'; termMonths: number; amount: number } | null
}

export const KEY = 'kasosyo-demo-v1'

export const initialState: DemoState = {
  lang: 'tl',
  lessonsDone: ['scam'],
  goal: { label: 'Emergency fund', amount: 30000 },
  streakWeeks: 3,
  impactPicks: [],
  chaptersDone: [0, 1],
  profile: { name: 'Beatriz Cruz', email: 'bea.cruz@example.com', mobile: '+639170000000', sfi: false },
  agreed: false,
  receipt: null,
  messengerOptIn: false,
  jvs: null,
}

function load(): DemoState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initialState, ...JSON.parse(raw) }
  } catch { /* storage unavailable: use defaults */ }
  return initialState
}

type Ctx = {
  state: DemoState
  set: (patch: Partial<DemoState> | ((s: DemoState) => Partial<DemoState>)) => void
  reset: () => void
  toast: (msg: string) => void
}

const StateContext = createContext<Ctx | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(load)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'fil'
  }, [state])

  // Keep every open tab (and every gallery frame) in sync, e.g. when the language changes.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) setState(load()) }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const set: Ctx['set'] = useCallback(patch => {
    setState(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }))
  }, [])

  const reset = useCallback(() => setState(s => ({ ...initialState, lang: s.lang })), [])

  const toast = useCallback((msg: string) => {
    setToastMsg(msg)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToastMsg(null), 2800)
  }, [])

  return (
    <StateContext.Provider value={{ state, set, reset, toast }}>
      {children}
      {toastMsg && (
        <div role="status" className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div className="rise max-w-[358px] rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMsg}
          </div>
        </div>
      )}
    </StateContext.Provider>
  )
}

export function useDemo() {
  const ctx = useContext(StateContext)
  if (!ctx) throw new Error('useDemo outside DemoProvider')
  return ctx
}

export const peso = (n: number) => '₱' + n.toLocaleString('en-PH')

/** Language helpers: t('Taglish', 'English') or tx({ tl, en }). */
export function useT() {
  const { state, set } = useDemo()
  const en = state.lang === 'en'
  return {
    lang: state.lang,
    setLang: (lang: Lang) => set({ lang }),
    t: <T,>(tl: T, eng: T): T => (en ? eng : tl),
    tx: (x: Txt) => (en ? x.en : x.tl),
  }
}
