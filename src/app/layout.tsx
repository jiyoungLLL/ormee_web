import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import ToastContainer from '@/components/ui/toast/ToastContainer';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Ormee',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ko'
      className='min-h-screen'
    >
      <body className={`${pretendard.variable} antialiased flex flex-col h-full text-gray-90`}>
        <QueryProvider>
          <ToastContainer />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
