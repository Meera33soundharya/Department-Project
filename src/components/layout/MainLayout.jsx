import { Sidebar } from './Sidebar';

export function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <main className="pl-64">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
