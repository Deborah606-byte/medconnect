"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { MEDCONNECT_DASHBOARD_APPOINTEMENTS as appointmentsData } from "@/constants";
import GenerateAppointmentsTable from "@/app/dashboard/appointments/GenerateAppointmentsTable";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";

export type AppointmentsDataType = (typeof appointmentsData)[number];

const tabMenu = [
  {
    name: "New Appointments",
    value: "new",
  },
  {
    name: "Completed Appointments",
    value: "completed",
  },
];

const AppointmentsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredAppointments, setFilteredAppointments] =
    useState<AppointmentsDataType[]>(appointmentsData);
  const [filterBy, setFilterBy] = useState("Date");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = appointmentsData.filter(
      (patient) =>
        patient.patientName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        patient.assignedHO.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  // Handle filter
  const handleFilter = (value: string) => {
    const filterValue = value.split("|")[0];
    const filterName = value.split("|")[1];

    setFilterBy(filterName);

    const filtered = filteredAppointments.sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) {
        return -1;
      }
      if (a[filterValue] > b[filterValue]) {
        return 1;
      }
      return 0;
    });

    setFilteredAppointments(filtered);
    setSearchTerm("");
  };

  return (
    <div className="w-full flex flex-col gap-5 px-5 py-5">
      <Tabs defaultValue={tabMenu[0].value}>
        <TabsList className="bg-transparent">
          {tabMenu.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.value}
              className="data-[state=active]:text-primary-blue data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary-blue data-[state=active]:bg-transparent hover:bg-transparent hover:text-primary-blue hover:font-bold data-[state=active]:rounded-none  text-primary-gray font-light hover:rounded-none"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabMenu.map((tab, index) => (
          <TabsContent value={tab.value} key={index}>
            <AppointmentsCommonTable
              filteredAppointments={filteredAppointments.filter(
                (patient) => patient.status.toLowerCase() === tab.value
              )}
              searchTerm={searchTerm}
              filterBy={filterBy}
              handleSearch={handleSearch}
              handleFilter={handleFilter}
              setFilteredAppointments={setFilteredAppointments}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AppointmentsTable;

type AppointmentsCommonTableProps = {
  filteredAppointments: AppointmentsDataType[];
  searchTerm: string;
  filterBy: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: (value: string) => void;
  setFilteredAppointments: React.Dispatch<
    React.SetStateAction<AppointmentsDataType[]>
  >;
};

const AppointmentsCommonTable = ({
  filteredAppointments,
  searchTerm,
  filterBy,
  handleSearch,
  handleFilter,
  setFilteredAppointments,
}: AppointmentsCommonTableProps) => {
  const filterOptions = [
    {
      value: "patientName",
      label: "Patient Name",
    },
    {
      value: "age",
      label: "Age",
    },
    {
      value: "time",
      label: "Time",
    },
    {
      value: "date",
      label: "Date",
    },
    {
      value: "phoneNumber",
      label: "Phone Number",
    },
    {
      value: "assignedHO",
      label: "Assigned HO",
    },
  ];

  return (
    <>
      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-5 w-fit pt-5">
        <div className="flex items-center gap-3 relative rounded-full bg-primary-green/10 px-5 py-2 text-primary-gray">
          <Search
            className="text-secondary-gray absolute top-3 left-5"
            size={20}
          />

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            className="w-full px-7 text-sm py-1 bg-transparent rounded-md outline-none border-0"
            onChange={handleSearch}
          />
        </div>

        <CustomFilterDropdown
          filterBy={filterBy}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
        />
      </div>

      <div className="flex flex-col gap-7 px-3 py-5 bg-white h-full w-full">
        <GenerateAppointmentsTable
          filteredAppointmentsData={filteredAppointments}
          setFilteredAppointmentsData={setFilteredAppointments}
        />

        {filteredAppointments.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No appointments found
            </p>
          </div>
        )}
      </div>
    </>
  );
};
