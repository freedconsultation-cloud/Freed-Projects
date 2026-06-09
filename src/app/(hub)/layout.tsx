import { RepoProvider } from "@/app/_components/RepoContext";
import Sidebar from "@/app/_components/Sidebar";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <RepoProvider>
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </RepoProvider>
    </div>
  );
}
