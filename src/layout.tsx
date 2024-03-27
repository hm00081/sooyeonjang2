import '../styles/global.css';
import { Metadata } from 'next';
import Navigation from './components/navigation';

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
            <Navigation />
            <body>{children}</body>
        </html>
    );
}
