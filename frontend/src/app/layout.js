import localFont from "next/font/local";
import "./globals.css";
import { ModalProvider } from "../Contexts/AuthModalContext.jsx";
import { NavProvider } from "../Contexts/NavbarContext.jsx";
import Footer from "../components/Footer.jsx";
import { LoginUserProvider } from "../Contexts/UserContext.jsx";
import { CategoryProvider } from "../Contexts/CategoryContext.jsx";
import Navbar from "../components/Navbar";
import { SearchProvider } from "../Contexts/SearchItemContext";
import AuthModal from "../components/AuthModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "OLX Bech de",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavProvider>
          <CategoryProvider>
            <LoginUserProvider>
              <ModalProvider>
                <SearchProvider>
                  <AuthModal />
                  <Navbar />
                  {children}
                  <Footer />
                </SearchProvider>
              </ModalProvider>
            </LoginUserProvider>
          </CategoryProvider>
        </NavProvider>
      </body>
    </html>
  );
}