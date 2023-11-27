import '../styles/styles';
import { poppins } from '../styles/styles';

export const runtime = 'edge';

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={poppins.className}>{children}</body>
      </html>
    );
}
