// Copies the site's wording from the project's content/ folder (the single source of truth,
// one level above this repo) into src/content/. Runs before dev and build. On GitHub, where
// ../content doesn't exist, the committed copy in src/content/ is used as is.
import { copyFileSync, existsSync } from 'node:fs'

const src = new URL('../../content/site.json', import.meta.url)
const dest = new URL('../src/content/site.json', import.meta.url)
if (existsSync(src)) {
  copyFileSync(src, dest)
  console.log('content: copied ../content/site.json into src/content/')
} else {
  console.log('content: ../content not found, using src/content/site.json as committed')
}
