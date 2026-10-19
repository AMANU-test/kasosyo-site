/**
 * Hero video on the landing page. Paste a YouTube link (watch, share or embed form).
 * Placeholder for now: Usapang Pera's "SEDPI social enterprise model" (5:56). Swap in a
 * "how to become a member / start investing" video when there is one, and update HERO_VIDEO_META.
 * Leave the URL empty to show the text outline instead.
 */
export const HERO_VIDEO_URL = 'https://youtu.be/TP02AggWXGo'
export const HERO_VIDEO_META = { title: 'SEDPI social enterprise model', length: '5:56', placeholder: true }

/** A route as a full URL path, including the deploy base (e.g. /repo-name/ on GitHub Pages). */
export const appUrl = (route: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + route

export const youtubeId = (url: string) => url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1] ?? null

export function youtubeEmbed(url: string) {
  const id = youtubeId(url)
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&cc_load_policy=1&playsinline=1` : null
}

/** 640×480 thumbnail (~50 KB); its letterbox bars crop away in a 16:9 box. */
export function youtubeThumb(url: string) {
  const id = youtubeId(url)
  return id ? `https://i.ytimg.com/vi/${id}/sddefault.jpg` : null
}
