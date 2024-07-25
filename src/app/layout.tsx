import DragDropWrapper from '@/components/DragDropWrapper';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cryptonite',
  description: 'Track Cryptocurrency Prices and Market Data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`h-screen ${inter.className}`}>
        <DragDropWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute z-50 overflow-auto h-screen">
              <Navbar />
              {children}
            </div>
          </ThemeProvider>
        </DragDropWrapper>
      </body>
    </html>
  );
}
