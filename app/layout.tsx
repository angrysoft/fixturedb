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
      <head></head>
      <Provider>
        <body className="bg-background">{children}</body>
      </Provider>
    </html>
  );
}
