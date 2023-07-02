import { Header } from "./components/Header";
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
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
            async
            defer
          />
          <div
            className="md:container md:mx-auto 
                   md:border-x-surface md:border-x-2
                     grid grid-rows-[auto_auto_1fr]
                    bg-background h-screen"
          >
            <Header />
            {children}
          </div>
        </body>
      </Provider>
    </html>
  );
}
