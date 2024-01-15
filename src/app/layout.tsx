import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Token - Api',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <div className="bg-sky-500 h-16 flex items-center justify-center">
        <h1 className='text-white text-xl'>Portal Token</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
        <div className="bg-sky-500 h-16 flex items-center justify-center">
        </div>
      </body>
    </html>
  )
}
