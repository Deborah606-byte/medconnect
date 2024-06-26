import LoginForm from "@/app/(auth)/login/LoginForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | MedConnect",
  description: "Login to MedConnect - Healthcare for Rural Communities",
};

const Login = () => {
  return (
    <main className="bg-primary-green min-h-screen">
      <div className="md:grid-cols-2 grid grid-cols-1 relative">
        {/* Login Text Description */}
        <section className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-10 p-10">
            <h1 className="flex items-center gap-3">
              <Image
                src="/assets/icons/logo-black.svg"
                alt="logo"
                width={80}
                height={80}
              />
              <p className="xl:text-4xl text-4xl font-bold text-white">
                Med
                <span className="text-secondary-gray">Connect</span>
              </p>
            </h1>

            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-5">
                <span className="text-3xl text-white">Optimizing</span>
                <hr className="w-1/3 bg-white h-[1px]" />
              </h3>

              <h2 className="text-3xl font-bold text-white">
                Healthcare Through Technology
              </h2>

              <Link href={"/#about-us"} className="group">
                <Button className="flex items-center gap-1 bg-transparent border border-white hover:border-0 px-8 w-fit text-white">
                  <span>Know More</span>
                  {/* Arrow */}
                  <ArrowRight
                    size={20}
                    className="text-white group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>

            {/* Login Image - Only on large devices */}
            <div className="md:block left-1/2 absolute bottom-0 hidden w-full max-w-md transform -translate-x-1/2">
              <Image
                src="/assets/images/login-image.svg"
                alt="login"
                width={500}
                height={500}
                quality={100}
                loading="lazy"
                className="object-contain w-[450px] h-[450px]"
              />
            </div>
          </div>
        </section>

        {/* Login Form */}
        <section className="flex items-center justify-center min-h-screen bg-white md:rounded-ss-[100px] rounded-t-[50px] md:rounded-t-none">
          <LoginForm />
        </section>
      </div>
    </main>
  );
};

export default Login;
