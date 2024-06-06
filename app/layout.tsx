import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link href="/" legacyBehavior>
                  <a className="text-white font-bold text-xl">Mon Site</a>
                </Link>
              </div>
              <div className="hidden md:block" >
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" legacyBehavior>
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accueil</a>
                  </Link>
                  <Link href="/dashboard" legacyBehavior>
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tableau de bord</a>
                  </Link>
                  {/* Ajoutez d'autres liens de menu selon vos besoins */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={inter.className}>{children}</div>
      </body>
    </html>
  );
}
