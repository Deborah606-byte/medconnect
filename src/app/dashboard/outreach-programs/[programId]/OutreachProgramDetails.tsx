import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BecomeASupporter from "@/app/dashboard/outreach-programs/[programId]/BecomeASupporter";
import RegisterProgram from "@/app/dashboard/outreach-programs/[programId]/RegisterProgram";
import AddToCalendarButton from "@/app/dashboard/outreach-programs/[programId]/AddToCalendarButton";
import { IOutreachProgram } from "@/types/backend";

type OutreachProgramDetailsProps = {
  program: IOutreachProgram;
};

const OutreachProgramDetails = async ({
  program,
}: OutreachProgramDetailsProps) => {
  const programEndTimeHour =
    parseInt(program.programStartTime.split(":")[0]) + 3;
  const programEndTimeMinute = parseInt(program.programStartTime.split(":")[1]);
  const formattedEndTimeHour =
    programEndTimeHour < 10 ? "0" + programEndTimeHour : programEndTimeHour;
  const formattedEndTimeMinute =
    programEndTimeMinute < 10
      ? "0" + programEndTimeMinute
      : programEndTimeMinute;

  const endTime = `${formattedEndTimeHour}:${formattedEndTimeMinute}`;
  const endTimeWithDate = `2024-07-25T${endTime}:00.000Z`;

  const programEndTime = new Date(endTimeWithDate).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  return (
    <div className="flex flex-col rounded w-full scrollbar-hide pb-10">
      <section className="flex items-center justify-between w-full gap-5 py-4">
        <h2 className="text-lg md:text-2xl font-bold text-primary-green capitalize">
          {program.title}
        </h2>
      </section>

      <section className="flex flex-col w-full gap-10">
        {/* Cover Image */}
        <div className="w-full overflow-hidden rounded relative h-[110vh] sm:h-[90vh] md:h-[80vh] 2xl:h-[50vh]">
          <div className="bg-black/50 absolute flex items-center justify-center w-full h-full" />

          <Image
            src={"/assets/images/community-outreach.jpg"}
            alt={program.title}
            width={1200}
            height={800}
            className="object-cover object-center w-full h-full"
          />

          <div className="2xl:p-10 absolute top-0 flex flex-col w-full h-full gap-5 p-5 text-white">
            {/* Back Button */}
            <Link
              href="/dashboard/outreach-programs"
              className="flex items-center gap-2"
            >
              <Button className="bg-primary-green w-fit hover:bg-primary-green flex items-center gap-2 text-center text-white rounded">
                <ChevronLeft size={20} className="text-white" />
                <span>Back</span>
              </Button>
            </Link>

            <div className="md:grid md:grid-cols-2 md:pt-8 flex flex-col w-full gap-5">
              {/* Program Description */}
              <section className="flex flex-col w-full gap-5">
                <h2 className="lg:text-4xl text-2xl font-bold text-white">
                  {program.title}
                </h2>

                <p className="text-xl text-white font-bold capitalize">
                  {program.location}
                </p>

                <p className="max-w-xl text-sm leading-loose text-white">
                  {program.description}
                </p>
              </section>

              {/* Program Booking */}
              <section className="md:max-w-xs md:pt-0 2xl:w-auto sm:pt-10 w-full">
                <div className="flex flex-col items-start gap-5 p-5 bg-white rounded-md shadow-xl atcb overflow-visible">
                  <h2 className="text-2xl font-bold text-black">Date & Time</h2>
                  <p className="text-primary-gray/50">
                    {new Date(program.programDate).toLocaleDateString("en-US", {
                      dateStyle: "full",
                    })}
                    , {program.programStartTime}
                  </p>

                  <AddToCalendarButton program={program} />

                  <RegisterProgram program={program} />

                  <BecomeASupporter program={program} />
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-5">
          {/* Program Description & Organizer Details */}
          <div className="flex flex-col w-full col-span-1 gap-5">
            {/* Program Description */}
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-black">Description</h2>

              <p className="text-secondary-gray text-sm leading-loose prose">
                {program.description}
              </p>
            </div>

            {/* Program Logistics */}
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-secondary-gray">
                Program Logistics
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <p className="text-primary-gray/50 text-sm">Date</p>
                <p className="text-primary-gray text-sm">
                  {new Date(program.programDate).toLocaleDateString("en-US", {
                    dateStyle: "long",
                  })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <p className="text-primary-gray/50 text-sm">Time</p>
                <p className="text-primary-gray text-sm">
                  {program.programStartTime} - {programEndTime}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <p className="text-primary-gray/50 text-sm">Location</p>
                <p className="text-primary-gray text-sm">{program.location}</p>
              </div>
            </div>
            {/* Target Audience */}
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-secondary-gray">
                Target Audience
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <p className="text-primary-gray/50 text-sm">Target Group</p>
                <p className="text-primary-gray text-sm capitalize">
                  {program.targetGroup}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <p className="text-primary-gray/50 text-sm">
                  Number of Participants
                </p>
                <p className="text-primary-gray text-sm">
                  {program.estimatedAudience}
                </p>
              </div>
            </div>
            {/* Organizer Contact*/}
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-secondary-gray">
                Organizer Contact
              </h2>

              <p className="text-primary-gray/50 text-sm">
                For more details, contact:{" "}
                <span className="text-primary-green">
                  {program.organizerPhone}
                </span>
              </p>
            </div>
          </div>

          {/* Program Location & Social Icons */}
          <div className="flex flex-col w-full col-span-1 gap-5">
            {/* Program Location */}
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-black">
                Program Location
              </h2>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.84170376923!2d7.367464676956561!3d9.02424682048499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62fd9%3A0x53bd17b4a20ea12b!2sKano%2C%20Federal%20Capital%20Territory%2C%20Nigeria!5e0!3m2!1sen!2sma!4v1719966333827!5m2!1sen!2sma"
                className="w-full h-[300px]"
                style={{ border: "0" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Program Country */}
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-medium text-black capitalize">
                {`${program.location}`}
              </h2>

              <p className="text-primary-gray/60 text-sm prose">
                {program.organization} headed by {program.organizerName} is a
                non-profit organization that aims to promote health and wellness
                in {program.location}. Their mission is to provide comprehensive
                healthcare services to the community, including medical care,
                health education, and preventive measures. They are committed to
                making a positive impact on the lives of their community members
                by offering affordable and accessible healthcare services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OutreachProgramDetails;
