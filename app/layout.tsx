import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Timmy the Turtle - Official Jelly Cat Chat',
  description: 'Chat with Timmy the turtle, the official Jelly Cat character! A friendly and interactive turtle companion from the beloved Jelly Cat collection.',
  keywords: 'Timmy, turtle, Jelly Cat, official, chat, interactive, plush, character',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-ocean-blue via-turtle-green to-sand-beige">
          {children}
        </div>
      </body>
    </html>
  )
}
