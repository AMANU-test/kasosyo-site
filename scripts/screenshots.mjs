// Exports every gallery screen as a 390×844 PNG at 2x into /screenshots/<language>/.
// Usage: npm run screenshots          (both Taglish and English)
//        npm run screenshots -- en    (one language: tl or en)
// Starts its own Vite server; no dev server needed.
import { mkdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createServer } from 'vite'
import { chromium } from 'playwright'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const langs = process.argv[2] ? [process.argv[2]] : ['tl', 'en']
const folder = { tl: 'taglish', en: 'english' }
const screens = JSON.parse(await readFile(path.join(root, 'src/data/screens.json'), 'utf8'))
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const server = await createServer({ root, mode: 'pane', server: { port: 5199, strictPort: false, open: false }, logLevel: 'error' })
await server.listen()
const base = server.resolvedUrls.local[0].replace(/\/$/, '')

const browser = await chromium.launch()
try {
  for (const lang of langs) {
    const outDir = path.join(root, 'screenshots', folder[lang])
    await mkdir(outDir, { recursive: true })
    // Seed the demo state with the language before any page script runs.
    const seed = `localStorage.setItem('kasosyo-demo-v1', JSON.stringify({ lang: '${lang}' }))`
    for (const s of screens) {
      // Fresh context per screen, so each one starts from the default demo state.
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
      await ctx.addInitScript(seed)
      const page = await ctx.newPage()
      await page.goto(base + s.path, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(s.id === 'J' ? 1500 : 400)
      const file = path.join(outDir, `${s.id}-${slug(s.label.replace(/^[A-Z]\s·\s/, ''))}.png`)
      await page.screenshot({ path: file })
      console.log('saved', path.relative(root, file))
      await ctx.close()
    }
    // One overview of the whole gallery, for reference.
    const ctx = await browser.newContext({ viewport: { width: 1800, height: 1000 } })
    await ctx.addInitScript(seed)
    const page = await ctx.newPage()
    await page.goto(base + '/gallery', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(2500)
    await page.screenshot({ path: path.join(outDir, 'gallery-overview.png'), fullPage: true })
    console.log('saved', path.relative(root, path.join(outDir, 'gallery-overview.png')))
    await ctx.close()
  }
} finally {
  await browser.close()
  await server.close()
}
