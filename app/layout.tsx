import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'FSCO Stack | Connect financial services to Web3', description: 'Acquire a modular Web2-to-Web3 technology stack, or work with FSCO on integration, implementation and white-label financial products.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
