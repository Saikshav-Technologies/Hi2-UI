import './globals.css';
import type { Metadata } from 'next';
import { Inter, Spline_Sans } from 'next/font/google';
import { AuthProvider } from '../components/auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });
const splineSans = Spline_Sans({
  subsets: ['latin'],
  variable: '--font-spline-sans',
});

export const metadata: Metadata = {
  title: 'Hi2 Social Media',
  description: 'Connect, Share, Live.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${splineSans.variable} bg-background font-sans antialiased`} suppressHydrationWarning>
        {/* <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        <AuthProvider>{children}</AuthProvider>
        {/* </div> */}
      </body>
    </html>
  );
}
