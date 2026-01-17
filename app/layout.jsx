import Script from 'next/script';
import './globals.css'
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generetad by create next app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        {children}
        <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      </body>
    </html>
  )
}