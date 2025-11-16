"use client";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { Bell, CalendarDays } from "lucide-react";

const PageHeader = () => {
  const { data } = useGetMeQuery(undefined);
  const userData = data?.data;
  return (
    <div className="bg-white flex justify-between items-center mb-5 py-4 md:px-12 px-4">
      <Image
        src={userData?.image || "/images/logo.png"}
        alt="profile image"
        width={350}
        height={200}
        className="h-8 w-[105px]"
      />
      <div className="flex gap-5 items-center">
        <button className="bg-primary p-2 rounded-xl text-white">
          <Bell size={20} />
        </button>
        <button className="bg-primary p-2 rounded-xl text-white">
          <CalendarDays size={20} />
        </button>
        <div className="font-medium">
          <p className="text[15px]">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</p>
          <p className="text[14px]">{new Date().toLocaleDateString("en-GB")}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
