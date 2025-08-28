import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Timmy the Turtle - Chat with Timmy',
  description: 'Chat with Timmy the turtle from Jelly Cat! A friendly and interactive turtle companion.',
  keywords: 'Timmy, turtle, Jelly Cat, chat, interactive, pet',
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
