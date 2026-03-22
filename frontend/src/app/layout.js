import "./globals.css";

export const metadata = {
  title: "Elysian Skin Clinic",
  description: "Integrated treatment plan & appointment management"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
