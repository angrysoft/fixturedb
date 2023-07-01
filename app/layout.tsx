import "./globals.css";
import { Provider } from "./store";

export const metadata = {
  title: "FixtureDb",
  description: "Fixtures/Ledscreens info",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <Provider>
        <body className="bg-background">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" async defer />
          {children}
          </body>
      </Provider>
    </html>
  );
}
