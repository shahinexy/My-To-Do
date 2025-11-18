import PageHeader from "@/components/shared/PageHeader";
import SideBar from "@/components/shared/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My To Do",
  description: "",
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <SideBar />
      <main className="w-full bg-[#eef7ff]">
        
        <PageHeader />
        <div className="md:py-5 md:px-5 px-3">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default CommonLayout;
