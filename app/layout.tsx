import Head from "next/head";
import "./globals.css";
import { Provider } from "./store";

export const metadata = {
  title: "FixtureDb",
  description: "Fixtures/Led screens info",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="public/favicon-16x16.png"
        />
        <link rel="manifest" href="public/site.webmanifest" />
        <link
          rel="mask-icon"
          href="public/safari-pinned-tab.svg"
          color="#bb87fa"
        />
        <link rel="shortcut icon" href="public/favicon.ico" />
        <meta name="msapplication-TileColor" content="#bb87fa" />
        <meta name="msapplication-config" content="public/browserconfig.xml" />
        <meta name="theme-color" content="#bb87fa" />
      </head>
      <Provider>
        <body className="bg-background">{children}</body>
      </Provider>
    </html>
  );
}
