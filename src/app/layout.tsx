import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../components/auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Hi2 Social Media',
    description: 'Connect, Share, Live.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full scroll-smooth">
            <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
                <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </div>
            </body>
        </html>
    )
}
