import { RepoProvider } from "@/app/_components/RepoContext";
import Sidebar from "@/app/_components/Sidebar";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <RepoProvider>
        <Sidebar />
        <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
      </RepoProvider>
    </div>
  );
}
