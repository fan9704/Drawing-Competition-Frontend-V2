import Header from "./Header";

interface AppShellProps {
    children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
    return (
        <div className="fixed inset-0 bg-zinc-900 h-screen">
            <Header />
            <div className="h-[calc(100vh-64px)]">{children}</div>
        </div>
    );
}
