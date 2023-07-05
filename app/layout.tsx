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
        
      </head>
      <Provider>
        <body className="bg-background">
          <div
            className="md:container md:mx-auto 
                   md:border-x-surface md:border-x-2
                     grid grid-rows-[auto_auto_1fr]
                    bg-background h-screen"
          >
            {children}
          </div>
        </body>
      </Provider>
    </html>
  );
}
