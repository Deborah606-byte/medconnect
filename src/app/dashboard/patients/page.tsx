import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AddPatient from "@/app/dashboard/patients/add-patients/AddPatient";
import PatientsTable from "@/app/dashboard/patients/PatientsTable";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { LiaFemaleSolid, LiaMaleSolid } from "react-icons/lia";

export const metadata: Metadata = {
  title: "Patients - MedConnect",
  description: "Manage your patients",
  icons: {
    icon: "/favicon.ico",
  },
};

const Patients = () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Patients Overview"}
        showDate={false}
      >
        <AddPatient />
      </DashboardContentHeader>

      {/* Patients Data Overview */}
      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Total Patients */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Total Patients
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>300</span>
              <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
                <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                <span>10%</span>
              </span>
            </p>

            {/* Patient Status */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-secondary-gray">
                Patient Status
              </h3>

              <div className="flex items-center gap-2">
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">145</span>
                  <span className="font-light text-xs">Homecare</span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">145</span>
                  <span className="font-light text-xs">Critical</span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">145</span>
                  <span className="font-light text-xs">Referrals</span>
                </p>
              </div>
            </div>
          </div>

          {/* New Patients in a Month */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              New Patients This Month
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>100</span>
            </p>
          </div>

          {/* Gender */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Gender
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>300</span>
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <LiaMaleSolid size={25} className="text-secondary-gray/20" />
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">55</span>
                  <span className="font-light text-xs">Male</span>
                </p>
              </div>

              <div className="flex items-center gap-1">
                <LiaFemaleSolid size={25} className="text-secondary-gray/20" />
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">145</span>
                  <span className="font-light text-xs">Female</span>
                </p>
              </div>
            </div>
          </div>

          {/* Patients with Chronic Conditions */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-4  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Patients with Chronic Conditions
            </h2>

            <p className="text-3xl text-primary-green font-bold">50</p>

            <div className="flex items-center gap-4">
              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">20</span>
                <span className="font-light text-xs">Diabetes</span>
              </p>

              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">9</span>
                <span className="font-light text-xs">Chronic Pains</span>
              </p>

              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">21</span>
                <span className="font-light text-xs">Asthma</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-md shadow w-full">
        <div className="border-b border-b-secondary-gray w-full flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full p-3">
            <h2 className="text-secondary-gray text-xl font-medium">
              Patients Information
            </h2>

            <Button className="bg-transparent hover:bg-transparent border-2 border-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
              <Upload className="text-primary-green" size={20} />
              <span className="font-bold text-primary-green">Upload</span>
            </Button>
          </div>
        </div>

        {/* Patients Table */}
        <PatientsTable />
      </section>
    </div>
  );
};

export default Patients;
