import AppointmentsTable from "@/app/dashboard/appointments/AppointmentsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Appointments - MedConnect",
  description: "Manage your appointments",
  icons: {
    icon: "/favicon.ico",
  },
};

const Appointments = () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <section className="bg-white rounded-md shadow w-full">
        <div className="border-b border-b-secondary-gray w-full flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full p-3">
            <h2 className="text-secondary-gray text-xl font-medium">
              Appointments
            </h2>

            <Link href={"/appointments/new"}>
              <Button className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
                <Plus className="text-white" size={20} />
                <span className="font-semibold">Add Appointment</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Appointments Table */}
        <AppointmentsTable />
      </section>
    </div>
  );
};

export default Appointments;
