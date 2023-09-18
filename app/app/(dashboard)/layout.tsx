import { MainNav } from "@/components/header/main-nav";
import UserNav from "@/components/header/user-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
