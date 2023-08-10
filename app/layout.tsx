import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthContextProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <meta name='fortmatic-site-verification' content='sRSJzN53kNvjzjCm' />
        <title>Auth Playground</title>
        <meta name='description' content='Auth Playground' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' type='image/png' href='favicon.png' />
      </head>
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
