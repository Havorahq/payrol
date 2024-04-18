import { Inter } from "next/font/google";
import '../styles/styles.scss';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Xalari",
  description: "Payroll Management on the blockchain!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
