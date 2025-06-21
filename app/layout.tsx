import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://promptg-ai.vercel.app'),
  title: 'PromptG AI - Instant Prompt Generator',
  description: 'Clean, ultra-fast prompt builder for AI image/video generation. Powered by Groq API.',
  keywords: ['AI', 'prompt generator', 'Groq', 'Gemini', 'Veo3', 'image generation', 'video generation'],
  authors: [{ name: 'Maulana Nais' }],
  creator: 'Maulana Nais',
  publisher: 'PromptG AI',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PromptG AI',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'PromptG AI',
    title: 'PromptG AI - Instant Prompt Generator',
    description: 'Clean, ultra-fast prompt builder for AI image/video generation. Powered by Groq API.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'PromptG AI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptG AI - Instant Prompt Generator',
    description: 'Clean, ultra-fast prompt builder for AI image/video generation. Powered by Groq API.',
    images: ['/android-chrome-512x512.png'],
    creator: '@mqulqnqq',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 select-none">
              PromptG AI
            </h1>
            <p className="text-gray-600 text-lg select-none">
              Instant Prompt Generator for Gemini/Veo3
            </p>
          </header>
          <main>
            {children}
          </main>          <footer className="text-center mt-12 text-gray-500 text-sm">
            <p className="select-none">Made by Maulana Nais • Groq-powered • Prompt-enhanced ✨</p>
            <div className="mt-4 space-x-4">
              <a href="https://github.com/maulananais" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/maulananais" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">LinkedIn</a>
              <a href="https://instagram.com/mqulqnqq/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">Instagram</a>
            </div>
            <div className="mt-2">
              <a href="#" className="text-green-500 hover:text-green-600 transition-colors text-sm">☕ Support & Donate</a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
