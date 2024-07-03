import Header from "./Header";

interface AppShellProps {
    children: React.ReactNode;
    allowAnon?: boolean;
}

export default function AppShell({ children, allowAnon }: AppShellProps) {
    return (
        <div className="fixed inset-0 bg-zinc-900 h-screen">
            <Header allowAnon={allowAnon} />
            <div className="h-[calc(100vh-64px)]">{children}</div>
        </div>
    );
}
