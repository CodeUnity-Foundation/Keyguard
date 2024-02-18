interface AuthLayoutProps {
  leftPanelChild: React.ReactNode;
  rightPanelChild: React.ReactNode;
}

export default function AuthLayout({ rightPanelChild, leftPanelChild }: AuthLayoutProps) {
  return (
    <main className="w-full h-screen flex items-center justify-center flex-col md:flex-row">
      <div className="flex-1 h-full bg-secondary rounded-r-3xl hidden md:block">{leftPanelChild}</div>
      <div className="flex-1 h-full flex items-center justify-center">{rightPanelChild}</div>
    </main>
  );
}
