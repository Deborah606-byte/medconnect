import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Settings, Bell } from "lucide-react";
import { MdOutlineQuestionMark } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useUserAtom } from "@/hooks";

const DashboardMobileHeader = () => {
  const [user] = useUserAtom();

  return (
    <Sheet>
      <SheetTrigger className="">
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

          <SheetDescription>
            {/* Dashboard Menu Items */}
            <ul className="flex flex-col gap-6 mb-auto">
              <Link
                href={"#"}
                className="hover:scale-105 transition p-4 rounded md:rounded-full bg-white/30 md:bg-primary-gray/10 flex items-center gap-3 relative"
              >
                <Bell size={20} className="text-white md:text-primary-gray" />
                <span className="md:hidden text-white text-base">
                  Notifications
                </span>
                <span className="text-white bg-red-500 rounded-full text-sm absolute top-5 right-2 md:top-0 md:right-0 h-5 w-5 text-center flex flex-col items-center">
                  4
                </span>
              </Link>

              <Link
                href={"#"}
                className="hover:scale-105 transition p-4 rounded md:rounded-full bg-white/30 md:bg-primary-gray/10 flex items-center gap-3"
              >
                <MdOutlineQuestionMark
                  size={20}
                  className="text-white md:text-primary-gray"
                />
                <span className="md:hidden text-white text-base">Help</span>
              </Link>

              <Link
                href={"#"}
                className="hover:scale-105 transition p-4 rounded md:rounded-full bg-white/30 md:bg-primary-gray/10 flex items-center gap-3"
              >
                <Settings
                  size={20}
                  className="text-white md:text-primary-gray"
                />
                <span className="md:hidden text-white text-base">Settings</span>
              </Link>
            </ul>
          </SheetDescription>
        </SheetHeader>

        <div className="rounded-md bg-white/40 md:bg-primary-gray/10 py-3 md:py-1 px-2 flex items-center gap-5">
          <Image
            src="/assets/icons/dashboard-header.svg"
            alt="avatar"
            width={70}
            height={70}
          />
          <p className="flex flex-col gap-1 text-white md:text-secondary-gray">
            <span className="font-bold text-lg capitalize">
              {user?.user?.compoundName ?? "MedConnect"}
            </span>
            <span className="font-medium text-base">C.H.P.S. Compound</span>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardMobileHeader;