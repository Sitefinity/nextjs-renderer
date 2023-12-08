export const dynamic = 'force-dynamic';

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className="container-fluid">{children}</body>
      </html>
    );
}
