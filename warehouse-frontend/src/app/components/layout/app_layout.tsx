"use client";

import AppHeader from "./app_header";
import Sidebar from "./sidebar";

interface Props {
  active: string;
  children: React.ReactNode;
}

export default function AppLayout({
  active,
  children,
}: Props) {
  return (
    <div className="app-container">
      <AppHeader />

      <div className="app-grid">
        <Sidebar active={active} />

        <main className="right-panel">
          <div className="table-card">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}