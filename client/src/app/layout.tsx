import './globals.css'
import { Toaster } from 'sonner'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'BookBindr',
    description: 'Book matcher',
}

export const viewport:Viewport ={
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={cn(inter.className,"bg-slate-50")}>
                <Toaster />
                {children}
            </body>
        </html>
    )
}
