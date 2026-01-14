import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Moqup - Drop. Frame. Ship.' },
      { name: 'description', content: 'Generate beautiful screenshot mockups with device frames, gradient backgrounds, and shadows. Free and open-source.' },
      { name: 'theme-color', content: '#09090B' },
      { property: 'og:title', content: 'Moqup - Drop. Frame. Ship.' },
      { property: 'og:description', content: 'Generate beautiful screenshot mockups instantly. Free and open-source.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Moqup - Drop. Frame. Ship.' },
      { name: 'twitter:description', content: 'Generate beautiful screenshot mockups instantly.' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[var(--color-background)] text-[var(--color-text-primary)] min-h-screen noise-bg">
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
