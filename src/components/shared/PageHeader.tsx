"use client";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { Bell, CalendarDays } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

const PageHeader = () => {
  const { data } = useGetMeQuery(undefined);
  const userData = data?.data;
  return (
    <div className="bg-white flex justify-between items-center mb-5 md:py-4 py-2 md:px-12 px-2">
      <div className="flex items-center md:gap-2">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <Image
          src={userData?.image || "/images/logo.png"}
          alt="profile image"
          width={350}
          height={200}
          className="md:h-8 h-6 md:w-[105px] w-20"
        />
      </div>

      <div className="flex md:gap-5 gap-2 items-center">
        <button className="bg-primary md:p-2 p-1 md:rounded-xl rounded-md text-white">
          <Bell size={20} />
        </button>
        <button className="bg-primary md:p-2 p-1 md:rounded-xl rounded-md text-white">
          <CalendarDays size={20} />
        </button>
        <div className="md:font-medium">
          <p className="md:text[15px] text-sm">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </p>
          <p className="md:text[14px] text-xs">{new Date().toLocaleDateString("en-GB")}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
