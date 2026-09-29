/**
 * SSR route probe (development diagnostic)
 * ---------------------------------------------------------------------------
 * Renders every route through renderToString inside a Vite module runner so any
 * render-time exception surfaces with its real stack trace. Client-only code
 * (effects, WebGL) is skipped by SSR, so a pass here narrows the fault to an
 * effect or browser API.
 *
 * Run: node scripts/ssr-probe.mjs
 */
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

const routes = [
  ['/', '/src/pages/Home.jsx'],
  ['/threshers', '/src/pages/Products.jsx'],
  ['/threshers/:slug', '/src/pages/ProductDetails.jsx'],
  ['/about', '/src/pages/About.jsx'],
  ['/why-us', '/src/pages/WhyUsPage.jsx'],
  ['/gallery', '/src/pages/GalleryPage.jsx'],
  ['/contact', '/src/pages/ContactPage.jsx'],
  ['/definitely-missing', '/src/pages/NotFound.jsx'],
]

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

let failures = 0

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')

  for (const [path, entry] of routes) {
    const url = path.includes(':slug') ? '/threshers/sam-1000-heavy-duty-grain-thresher' : path
    try {
      const html = renderToString(
        React.createElement(
          MemoryRouter,
          { initialEntries: [url] },
          React.createElement(App),
        ),
      )
      const hasFallback = html.includes('page could not be displayed')
      console.log(`${hasFallback ? 'FALLBACK' : 'OK     '}  ${url}  (${html.length} bytes)`)
      if (hasFallback) failures += 1
    } catch (error) {
      failures += 1
      console.log(`THROW   ${url}`)
      console.log(`        ${error.message}`)
      if (error.stack) {
        console.log(
          error.stack
            .split('\n')
            .slice(0, 8)
            .map((line) => `        ${line}`)
            .join('\n'),
        )
      }
    }
  }
} finally {
  await vite.close()
}

console.log(failures === 0 ? '\nAll routes rendered without errors.' : `\n${failures} route(s) failed.`)
process.exit(failures === 0 ? 0 : 1)
