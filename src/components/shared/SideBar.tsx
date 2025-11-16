"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ClipboardMinus, Contact } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { removeCookie } from "@/utils/cookies";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

const items = [
  {
    title: "Todos",
    url: "/",
    icon: ClipboardMinus,
  },
  {
    title: "Account Information",
    url: "/account-information",
    icon: Contact,
  },
];

const SideBar = () => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data } = useGetMeQuery(undefined);

  console.log(data);

  const handleLogOut = () => {
    dispatch(logout());
    removeCookie("token");
    router.push("/login");
  };
  return (
    <Sidebar>
      <SidebarContent className="!bg-[#0D224A] text-white">
        <SidebarGroup>
          <div className="mx-auto my-8 space-y-3 text-center">
            <Image
              src={data?.profile_image || "/placeholders/image_placeholder.png"}
              alt="logo"
              width={150}
              height={150}
              className="h-24 w-24 rounded-full"
            />
            <div className="space-y-1 text-white ">
              <h2 className="font-semibold">
                {data?.first_name || "User Name"}
              </h2>
              <p className="text-xs">{data?.email}</p>
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`text-base text-[#8CA3CD] font-medium rounded-none px-6 py-5 hover:bg-gradient-to-l  to-[#5272FF] from-[#0D224A] ${
                      pathName === `${item.url}`
                        ? "bg-gradient-to-l  to-[#5272FF] from-transparent text-white"
                        : "text-[#8CA3CD]"
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="!bg-[#0D224A] text-white">
        <button
          onClick={handleLogOut}
          className="py-3 border font-medium text-base"
        >
          Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
