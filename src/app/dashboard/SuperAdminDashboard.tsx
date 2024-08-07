"use client";
import DoughnutChart from "@/app/dashboard/graphs/DoughnutChart";
import LineChart from "@/app/dashboard/graphs/LineChart";
import {
  MEDCONNECT_DASHBOARD_RECENT_ACTIVITIES,
  MEDCONNECT_DASHBOARD_REPORTS,
} from "@/constants";
import { useAuth } from "@/hooks";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GrPowerCycle } from "react-icons/gr";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";
import GenerateTable from "@/app/dashboard/GenerateTable";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  ChpsCompound,
  IAppointment,
  IDiagnosisReport,
  IPrescription,
  IStaff,
  Patient,
} from "@/types/backend";
import { getAllStaff } from "@/actions/staff.action";
import { getAllChpsCompounds } from "@/actions/chps-compound.action";
import { useFetch } from "@/hooks/useFetch";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { ClipLoader } from "react-spinners";
import { getPatients } from "@/actions/patients.action";
import {
  getAllAppointments,
  getAllDiagnosisReports,
  getAllPrescriptions,
} from "@/actions/single-patient.action";
import seedColor from "seed-color";

const SuperAdminDashboard = () => {
  const [user] = useAuth();

  // chps compounds
  const { data: chpsCompounds, isLoading: isLoadingChpsCompounds } = useFetch({
    queryKey: ["chps-compound"],
    queryFn: async () => await getAllChpsCompounds(),
  });

  // health officials
  const { data: healthStaff } = useFetch({
    queryKey: ["staff"],
    queryFn: async () => await getAllStaff(),
  });

  // patients
  const { data: patients } = useFetch({
    queryKey: ["patients"],
    queryFn: async () => await getPatients(),
  });

  // appointments
  const { data: appointments } = useFetch({
    queryKey: ["appointments"],
    queryFn: async () => await getAllAppointments(),
  });

  // prescriptions
  const { data: prescriptions } = useFetch({
    queryKey: ["prescriptions"],
    queryFn: async () => await getAllPrescriptions(),
  });

  // diagnosis
  const { data: diagnosis } = useFetch({
    queryKey: ["diagnosis-reports"],
    queryFn: async () => await getAllDiagnosisReports(),
  });

  const [totalChpsCompounds, setTotalChpsCompounds] = useState<ChpsCompound[]>(
    []
  );
  const [totalHealthOfficials, setTotalHealthOfficials] = useState<IStaff[]>(
    []
  );
  const [totalPatients, setTotalPatients] = useState<Patient[]>([]);
  const [totalAppointments, setTotalAppointments] = useState<IAppointment[]>(
    []
  );
  const [totalPrescriptions, setTotalPrescriptions] = useState<IPrescription[]>(
    []
  );
  const [totalDiagnosis, setTotalDiagnosis] = useState<IDiagnosisReport[]>([]);

  useEffect(() => {
    if (chpsCompounds) {
      setTotalChpsCompounds(chpsCompounds);
    }
    if (healthStaff) {
      setTotalHealthOfficials(healthStaff);
    }
    if (patients) {
      setTotalPatients(patients);
    }
    if (appointments) {
      setTotalAppointments(appointments);
    }
    if (prescriptions) {
      setTotalPrescriptions(prescriptions);
    }
    if (diagnosis) {
      setTotalDiagnosis(diagnosis);
    }
  }, [
    appointments,
    chpsCompounds,
    diagnosis,
    healthStaff,
    patients,
    prescriptions,
  ]);

  const isUserAdmin = user?.isSuperAdmin;
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const tableDataPerPage = 5;
  const tableData = totalChpsCompounds;

  // Get current appointments for the page
  const indexOfLastData = currentTablePage * tableDataPerPage;
  const indexOfFirstData = indexOfLastData - tableDataPerPage;
  const currentData = tableData.slice(indexOfFirstData, indexOfLastData);

  if (isLoadingChpsCompounds) {
    return (
      <RenderEmptyComponent>
        <ClipLoader size={30} loading={true} color="#2D4763" />
      </RenderEmptyComponent>
    );
  }

  const donutChartLabels = [
    "Patient Visits",
    "Prescriptions Issued",
    "Common Diagnosis",
    "Appointments Scheduled",
    "Total Chps Compounds",
    "Health Officials",
  ];

  const donutChartData = [
    totalPatients.length,
    totalPrescriptions.length,
    totalDiagnosis.length,
    totalAppointments.length,
    totalChpsCompounds.length,
    totalHealthOfficials.length,
  ];

  return (
    <div className={`${isUserAdmin ? "" : "hidden"}`}>
      {/* First Row */}
      <section className={`grid grid-cols-1 md:grid-cols-3 w-full gap-5`}>
        <div className="flex flex-col gap-5 w-full col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Total C.H.P.S. Compounds */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Total C.H.P.S. Compounds
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 relative">
                  <p className="font-bold text-2xl relative text-primary-green">
                    <span>{totalChpsCompounds.length}</span>
                    <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
                      <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                      <span>10%</span>
                    </span>
                  </p>

                  <div className="flex items-center gap-2 md:gap-5">
                    <p className="flex flex-col gap-1 text-secondary-gray">
                      <span className="font-bold text-sm">
                        {Math.floor(Math.random() * totalChpsCompounds.length)}
                      </span>
                      <span className="font-light text-xs">Rural</span>
                    </p>

                    <p className="flex flex-col gap-1 text-secondary-gray">
                      <span className="font-bold text-sm">
                        {Math.floor(Math.random() * totalChpsCompounds.length)}
                      </span>
                      <span className="font-light text-xs">Sub-Town</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Health Officials */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-4  w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Total Health Officials
              </h2>

              <p className="text-3xl text-primary-green font-bold">
                {totalHealthOfficials.length}
              </p>

              <div className="flex items-center gap-2 justify-between">
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">
                    {
                      totalHealthOfficials.filter(
                        (staff) => staff.position === "Nurse"
                      ).length
                    }
                  </span>
                  <span className="font-light text-xs">Nurses</span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">
                    {
                      totalHealthOfficials.filter(
                        (staff) => staff.position === "Physician Assistant"
                      ).length
                    }
                  </span>
                  <span className="font-light text-xs">
                    Physician Assistant
                  </span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">
                    {
                      totalHealthOfficials.filter(
                        (staff) => staff.position === "Doctor"
                      ).length
                    }
                  </span>
                  <span className="font-light text-xs">Doctors</span>
                </p>
              </div>
            </div>
          </div>

          {/* Compounds */}
          <div className="rounded-md shadow bg-white col-span-1 w-full">
            <h2 className="flex items-center justify-between gap-2 px-3 py-3">
              <span className="text-secondary-gray font-medium">Compounds</span>
              <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
            </h2>

            <hr className="w-full bg-secondary-gray h-0.5" />

            <div className="w-full py-2">
              <GenerateTable
                tableHeaderNames={[
                  "Compound Name",
                  "Location",
                  "District",
                  "Region",
                  "Last Logged In",
                ]}
                data={tableData}
                currentPage={currentTablePage}
                setCurrentPage={setCurrentTablePage}
                dataPerPage={tableDataPerPage}
              >
                {currentData.reverse().map((data, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-secondary-gray font-semibold">
                      {data.name}
                    </TableCell>

                    <TableCell className="text-secondary-gray font-semibold">
                      {data.location}
                    </TableCell>
                    <TableCell className="text-secondary-gray font-semibold">
                      {data.district}
                    </TableCell>
                    <TableCell className="text-secondary-gray font-semibold">
                      {data.region}
                    </TableCell>
                    <TableCell className="text-secondary-gray font-semibold">
                      {
                        [
                          "2024/01/01",
                          "2023/12/31",
                          "2024/07/10",
                          "2015/10/20",
                        ][Math.floor(Math.random() * 4)]
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </GenerateTable>
            </div>
          </div>
        </div>

        {/* Compound Management */}
        <aside className="rounded-md shadow bg-white w-full h-full min-h-full col-span-1 relative">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Compound Management
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col h-full items-center gap-3 px-3 py-5">
            {/* Graph */}
            <div className="flex flex-col items-center pt-5 w-full h-full">
              <DoughnutChart
                labels={donutChartLabels}
                data={donutChartData}
                bgColors={Array.from({
                  length: donutChartData.length,
                }).map((_, i) => seedColor((i + 1).toString()).toHex())}
              />
            </div>
          </div>
        </aside>
      </section>

      {/* 2nd Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 w-full gap-5 py-5">
        {/* Disease Outbreak Analysis */}
        <div className="rounded-md shadow bg-white w-full h-full">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              System Performance
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col items-center gap-3 px-3 py-5 w-full h-full">
            {/* Graph Goes Here */}
            <div className="flex flex-col items-center w-full h-full pt-5">
              <LineChart
                labels={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                datasets={[
                  {
                    label: "System Uptime",
                    backgroundColor: "#FF0000",
                    borderColor: "#FF6347",
                    pointBackgroundColor: "#FF4500",
                    pointBorderColor: "#FF6347",
                    data: [95, 98, 99, 97, 96, 94, 95],
                  },
                  {
                    label: "Error Report",
                    backgroundColor: "#FFFF00",
                    borderColor: "#FFD700",
                    pointBackgroundColor: "#FFA500",
                    pointBorderColor: "#FFD700",
                    data: [50, 33, 52, 94, 135, 120, 100],
                  },
                  {
                    label: "Response Times",
                    backgroundColor: "#40E0D0",
                    borderColor: "#20B2AA",
                    pointBackgroundColor: "#48D1CC",
                    pointBorderColor: "#20B2AA",
                    data: [120, 130, 110, 115, 125, 135, 140],
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-md shadow bg-white w-full h-full">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Recent Activities
            </span>
            <p className="flex items-center gap-2">
              <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
              <Trash2
                size={20}
                className="text-secondary-gray/50 cursor-pointer"
              />
            </p>
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col gap-3 px-3 py-5">
            {MEDCONNECT_DASHBOARD_RECENT_ACTIVITIES.slice(0, 5).map(
              (activity, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-3 text-secondary-gray"
                >
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IoCheckboxOutline
                        size={30}
                        className="text-secondary-gray"
                      />

                      <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-sm font-light opacity-50">
                          {activity.description}
                        </p>

                        <p className="sm:hidden text-secondary-gray/50 text-sm font-semibold">
                          {activity.timeAgo}
                        </p>
                      </div>
                    </div>

                    <p className="hidden sm:block text-secondary-gray/50 text-sm font-semibold">
                      {activity.timeAgo}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Report */}
        <div className="rounded-md shadow bg-white w-full h-full">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">Report</span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col gap-3 px-3 py-5">
            {MEDCONNECT_DASHBOARD_REPORTS.slice(0, 5).map((report, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 text-secondary-gray"
              >
                <h3 className="font-semibold">{report.title}</h3>
                <p className="text-sm font-light opacity-50">
                  {report.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
