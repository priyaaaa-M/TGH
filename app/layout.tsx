import type { Metadata } from 'next'
import { Inter, Playfair_Display, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { RegisterModalProvider } from '@/components/register-modal-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
})

const caveat = Caveat({ 
  subsets: ["latin"],
  variable: "--font-caveat",
})

export const metadata: Metadata = {
  title: 'The Girlfriend Hour | A Safe Creative Space for Gen Z Voices',
  description: 'A safe creative space for Gen Z voices, stories, expression, music, theatre, thoughts and truth. Join the 15-day expression lab.',
  keywords: ['Gen Z', 'creative space', 'expression', 'storytelling', 'community', 'safe space'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable} bg-[#F8F4EE]`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#F8F4EE] text-foreground">
        <RegisterModalProvider>
          {children}
        </RegisterModalProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
