import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const fontUrl = `${basePath}/fonts/host-grotesk-latin-wght-normal.woff2`;
const fontFace = `@font-face{font-family:'Host Grotesk';src:url('${fontUrl}') format('woff2-variations');font-weight:300 800;font-style:normal;font-display:swap}`;

export const metadata: Metadata = {
  title: 'FSCO Stack | Bring your business onchain',
  icons: { icon: `${basePath}/favicon.svg` },
  description: 'FSCO Stack connects the systems you already run to stablecoin payments, digital investment and tokenized assets, as white-label products or integrations built with our team.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href={fontUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: fontFace }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
