"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks";
import { usePathname } from "next/navigation";
import NotificationsModal from "@/app/dashboard/notifications/NotificationsModal";
import HelpModal from "@/app/dashboard/help/HelpModal";

const DashboardMobileHeader = () => {
  const [user] = useAuth();
  const isSuperAdmin = user?.isSuperAdmin;
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={25} className="text-secondary-gray" />
      </SheetTrigger>

      <SheetContent className="px-3 flex flex-col pt-10 pb-5 min-h-screen bg-secondary-gray text-white">
        <SheetHeader className="mb-auto">
          <SheetTitle className="py-5 flex flex-col gap-3">
            <Link href={"/"} className="flex items-center gap-2 justify-center">
              <Image
                src="/assets/icons/logo-green.svg"
                alt="Logo"
                width={50}
                height={50}
              />
              <h1 className="text-3xl flex items-center font-bold text-white">
                <span className="text-primary-green">Med</span>Connect
              </h1>
            </Link>

            <Separator className="bg-white my-1" />
          </SheetTitle>

          <div>
            {/* Dashboard Menu Items */}
            <div className="flex flex-col gap-6 mb-auto">
              <NotificationsModal />

              <HelpModal />

              <Link
                href={"/dashboard/settings"}
                className="hover:scale-105 transition p-4 rounded md:rounded-full bg-white/30 md:bg-primary-gray/10 flex items-center gap-3"
              >
                <Settings
                  size={20}
                  className={`${
                    pathname === "/dashboard/settings"
                      ? "text-primary-green"
                      : "text-white"
                  }}`}
                />
                <span
                  className={`md:hidden ${
                    pathname === "/dashboard/settings"
                      ? "text-primary-green"
                      : "text-white"
                  } text-base`}
                >
                  Settings
                </span>
              </Link>
            </div>
          </div>
        </SheetHeader>

        <div className="rounded-md bg-white/40 md:bg-primary-gray/10 py-3 md:py-1 px-2 flex items-center gap-5">
          <Image
            src={
              isSuperAdmin
                ? "/assets/avatars/super-admin.svg"
                : "/assets/icons/dashboard-header.svg"
            }
            alt="avatar"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
          <p className="flex flex-col gap-1 text-white md:text-secondary-gray">
            <span className="font-bold text-lg capitalize">
              {isSuperAdmin
                ? user.admin?.name.split(" ")[0]
                : user?.staff?.fullName.split(" ")[0]}
            </span>
            <span className="font-medium text-base">
              {isSuperAdmin
                ? "Super Admin"
                : user?.staff?.fullName.substring(
                    0,
                    user?.staff?.fullName.indexOf(" ") + 1
                  )}
            </span>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardMobileHeader;
