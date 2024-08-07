"use client";

import React from "react";
import { Settings } from "lucide-react";
import { MdOutlineQuestionMark } from "react-icons/md";
import DashboardMobileHeader from "@/app/dashboard/DashboardMobileHeader";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks";
import { usePathname } from "next/navigation";
import NotificationsModal from "@/app/dashboard/notifications/NotificationsModal";
import DashboardSidebarMobile from "@/components/DashboardSidebarMobile";

const DashboardHeader = () => {
  const [user] = useAuth();
  const isSuperAdmin = user?.isSuperAdmin;
  const pathname = usePathname();

  return (
    <header className="w-full py-5 px-3 md:px-4 bg-white z-50">
      <div className="flex items-center justify-between relative w-full">
        <div className="md:hidden">
          <DashboardSidebarMobile />
        </div>

        <h2 className="text-xl capitalize md:text-2xl text-secondary-gray font-extrabold">
          {isSuperAdmin ? user.admin?.name : user?.staff?.fullName}
        </h2>

        {/* MobileNav */}
        <div className="md:hidden">
          <DashboardMobileHeader />
        </div>

        <ul className="hidden items-center gap-6 md:flex">
          <NotificationsModal />

          <Link
            href={"/dashboard/help"}
            className="hover:scale-105 transition p-4 rounded-full bg-primary-gray/10 flex flex-col items-center"
          >
            <MdOutlineQuestionMark
              size={15}
              className={
                pathname === "/dashboard/help"
                  ? "text-primary-green"
                  : "text-secondary-gray"
              }
            />
          </Link>

          <Link
            href={"/dashboard/settings"}
            className="hover:scale-105 transition p-4 rounded-full bg-primary-gray/10 flex flex-col items-center"
          >
            <Settings
              size={15}
              className={
                pathname === "/dashboard/settings"
                  ? "text-primary-green"
                  : "text-secondary-gray"
              }
            />
          </Link>

          <div className="rounded-md bg-primary-gray/10 py-1 px-3 flex items-center gap-3">
            <Image
              src={
                isSuperAdmin
                  ? user.admin?.profilePictureUrl ??
                    "/assets/icons/dashboard-header.svg"
                  : "/assets/icons/dashboard-header.svg"
              }
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/assets/icons/dashboard-header.svg";
              }}
            />
            <p className="flex flex-col gap-1 text-secondary-gray">
              <span className="font-bold capitalize">
                {isSuperAdmin
                  ? user.admin?.name.split(" ")[0]
                  : user?.staff?.fullName.split(" ")[0]}
              </span>
              <span className="font-medium text-sm">
                {isSuperAdmin
                  ? "Super Admin"
                  : user?.staff?.fullName.substring(
                      user?.staff?.fullName.indexOf(" ") + 1
                    )}
              </span>
            </p>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
