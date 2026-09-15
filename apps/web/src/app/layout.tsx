import { cn } from 'cn';
import { Outfit, Roboto_Slab } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './global.css';

const robotoSlabHeading = Roboto_Slab({ subsets: ['latin'], variable: '--font-heading' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Home Garden',
  description: 'Manage your gardens',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn('font-sans', 'font-sans', outfit.variable, robotoSlabHeading.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
