"use client";

import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/schema/user.schema";
import { forgotPasswordFormSubmit } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { IoPerson } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import CustomErrorElement from "@/components/CustomErrorElement";
import { ForgotPasswordType } from "@/types/index";

const ForgotPasswordForm = () => {
  // state
  const [successMessage, setSuccessMessage] = useState("");
  const [submitFormErrors, setSubmitFormErrors] = useState<string[]>([]);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  // submit login form
  const mutation = useMutation({
    mutationFn: forgotPasswordFormSubmit,
    onSettled: (result) => {
      if (!result?.status) {
        setSubmitFormErrors(result?.errors!);
        return;
      }

      reset();
      setSuccessMessage(result?.message);
    },
  });

  const handleForgotPasswordSubmission: SubmitHandler<
    ForgotPasswordType
  > = async (data) => {
    setSubmitFormErrors([]);
    mutation.mutate(data);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${
        successMessage ? "max-w-md" : "max-w-xl"
      } p-10`}
    >
      {successMessage ? (
        <div className="w-full py-5 px-2 flex flex-col items-center gap-3 bg-green-300 rounded shadow">
          <p className="text-center leading-loose">{successMessage}</p>
          <Button
            onClick={() => setSuccessMessage("")}
            variant={"default"}
            className="text-white py-2 px-4"
          >
            Go Back
          </Button>
        </div>
      ) : (
        <div className="z-20 flex flex-col w-full gap-5">
          <h3 className="text-secondary-gray text-start text-4xl font-bold">
            Forgot Password?
          </h3>

          <p className="text-start text-secondary-gray font-semibold">
            Enter the email address associated with the account.
          </p>

          <CustomErrorElement errors={submitFormErrors} />

          <form
            onSubmit={handleSubmit(handleForgotPasswordSubmission)}
            className="flex flex-col w-full gap-4"
            method="POST"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="flex items-center gap-2">
                <IoPerson size={15} className="text-secondary-gray" />
                <span className="text-secondary-gray">Email</span>
              </label>

              <input
                type="text"
                className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 bg-transparent border-b-2 outline-none"
                placeholder="Enter your email address"
                {...register("email")}
              />

              {errors?.email?.message && (
                <p className="py-2 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <ForgotPasswordFormSubmitButton pending={mutation.isPending} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-secondary-gray text-sm">
                  Didn&apos;t receive link?
                </span>
                <Link
                  href="#"
                  onClick={() => {}}
                  className="text-secondary-gray hover:underline w-fit text-sm font-bold"
                >
                  Resend
                </Link>
              </div>

              <Link
                href="/login"
                className="text-secondary-gray hover:underline w-fit text-sm"
              >
                Go Back
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;

const ForgotPasswordFormSubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5 py-4">
      <Button
        disabled={pending}
        className="bg-primary-green hover:bg-secondary-gray w-full px-10 py-3 text-center text-white"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Send Link"
        )}
      </Button>
    </div>
  );
};
