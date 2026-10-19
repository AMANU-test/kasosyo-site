import type { Txt } from '../state'

/**
 * Photo slots. Files live in public/photos/. A slot whose file is missing shows a
 * labelled placeholder instead, so dropping in a file with the right name is enough.
 * Real photos come from sedpi.com; partner and member photos still need consent.
 * `pos` is the CSS object-position used when the photo is cropped.
 */
export const photos = {
  /* From sedpi.com */
  'sedpi-team': { file: 'team.jpg', pos: '50% 70%', hint: 'SEDPI team', alt: { tl: 'Ang SEDPI team sa harap ng kanilang opisina', en: 'The SEDPI team in front of their office' } },
  'sedpi-community': { file: 'community.jpg', pos: '50% 60%', hint: "SEDPI's 20th anniversary", alt: { tl: 'Ang SEDPI community sa ika-20 anibersaryo', en: "The SEDPI community at SEDPI's 20th anniversary" } },
  'sedpi-leaders': { file: 'leaders.jpg', pos: '50% 35%', hint: 'Sir Vince and SEDPI leaders', alt: { tl: 'Si Sir Vince Rapisura kasama ang SEDPI leaders', en: 'Sir Vince Rapisura with SEDPI leaders' } },
  'kanegosyo-team': { file: 'kanegosyo-team.jpg', pos: '50% 45%', hint: 'KaNegosyo team', alt: { tl: 'Ang KaNegosyo team', en: 'The KaNegosyo team' } },
  'kanegosyo-branch': { file: 'branch.jpg', pos: '50% 50%', hint: 'KaNegosyo Maco branch, Davao', alt: { tl: 'Ang KaNegosyo branch sa Maco, Davao', en: 'The KaNegosyo branch in Maco, Davao' } },
  'branch-opening': { file: 'branch-opening.jpg', pos: '50% 55%', hint: 'Opening of the Maco branch', alt: { tl: 'Pagbubukas ng KaNegosyo Maco branch', en: 'Opening of the KaNegosyo Maco branch' } },
  'vince-forum': { file: 'vince-forum.jpg', pos: '30% 50%', hint: 'Sir Vince at a SEDPI forum', alt: { tl: 'Si Sir Vince sa isang SEDPI forum', en: 'Sir Vince speaking at a SEDPI forum' } },

  /* Still needed from SEDPI */
  'hero-video': { file: 'hero-video.jpg', pos: '50% 50%', hint: 'Video thumbnail', alt: { tl: 'Thumbnail ng video', en: 'Video thumbnail' } },
  'cda-certificate': { file: 'cda-certificate.jpg', pos: '50% 50%', hint: 'SEDPI Coop CDA certificate of registration', alt: { tl: 'CDA certificate of registration ng SEDPI Coop', en: "SEDPI Coop's CDA certificate of registration" } },
  'member-story': { file: 'member-story.jpg', pos: '50% 30%', hint: 'Young KaSosyo member (with consent)', alt: { tl: 'Isang batang KaSosyo member', en: 'A young KaSosyo member' } },
  zion: { file: 'zion.jpg', pos: '50% 30%', hint: 'Zion', alt: { tl: 'Si Zion', en: 'Zion' } },
  'partner-1': { file: 'partner-1.jpg', pos: '50% 50%', hint: 'KaNegosyo partner 1 (with consent)', alt: { tl: 'KaNegosyo partner', en: 'KaNegosyo partner' } },
  'partner-2': { file: 'partner-2.jpg', pos: '50% 50%', hint: 'KaNegosyo partner 2 (with consent)', alt: { tl: 'KaNegosyo partner', en: 'KaNegosyo partner' } },
  'partner-3': { file: 'partner-3.jpg', pos: '50% 50%', hint: 'KaNegosyo partner 3 (with consent)', alt: { tl: 'KaNegosyo partner', en: 'KaNegosyo partner' } },
} satisfies Record<string, { file: string; pos: string; hint: string; alt: Txt }>

export type PhotoSlot = keyof typeof photos
