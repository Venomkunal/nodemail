import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <header>
          {/* <!-- Canonical --> */}
    <link rel="canonical" href="https://www.shinewebtechcretions.online/" />

    {/* <!-- Favicon --> */}
    <link rel="icon" type="image/svg+xml" href="https://www.shinewebtechcretions.online/favicon.ico" />
        </header>
      <body>{children}</body>
    </html>
  );
}
