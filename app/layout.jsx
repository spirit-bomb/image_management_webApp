import "./globals.css";
import Nav from '@/components/Nav';

export const metadata = {
  title: "Image_management",
  description: "Cloud based image management web-app",
};

export default function RootLayout({children}){
  return (
    <html lang="en">
      <body className="flex flex-col w-full h-full">
        <Nav/>
        {children}
      </body>
    </html>
  );
}
