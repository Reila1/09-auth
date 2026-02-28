import type { Metadata } from 'next';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}