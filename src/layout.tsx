import '../styles/global.css';
import { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
    title: {
        template: 'sooyeonjang',
        default: 'Next nodes',
    },
    description: 'Sooyeonjang Matrix Cycle',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <SpeedInsights />
                {children}
            </body>
        </html>
    );
}
