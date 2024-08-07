"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Head>
          <title>Oops! Something went wrong!</title>
        </Head>

        <section className="flex flex-col gap-5 min-h-screen relative w-full">
          <header className="w-full py-3 px-3 md:px-4 bg-white shadow-sm z-50">
            <div className="flex items-center justify-between relative w-full">
              <Link href={"/"} className="flex items-center gap-2">
                <Image
                  src="/assets/icons/logo-black.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                />
                <h1 className="text-2xl flex items-center font-bold text-secondary-gray">
                  <span className="text-primary-green">Med</span>Connect
                </h1>
              </Link>

              <ul className="items-center gap-6 md:flex">
                <Link
                  href={"/"}
                  className="text-white text-center bg-primary-green hover:bg-primary-green rounded-none w-full px-5 py-3"
                >
                  Home
                </Link>

                <Link
                  href={"/dashboard"}
                  className="text-white text-center bg-primary-green hover:bg-primary-green rounded-none w-full px-5 py-3"
                >
                  Dashboard
                </Link>
              </ul>
            </div>
          </header>

          <div className="flex flex-col items-center mx-auto mt-32 py-20 space-y-6 text-center">
            <h2 className="text-4xl font-bold text-primary-dark">
              Something went wrong!
            </h2>

            <div className="flex flex-col items-center space-y-3 md:flex-row md:space-y-0 md:space-x-5">
              <button
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => reset()
                }
                className="px-5 py-3 text-white rounded bg-primary-green hover:bg-transparent border hover:border-green-500 hover:text-primary-green"
              >
                Try again
              </button>

              <Link
                href={"/"}
                className="px-5 py-3 text-white rounded bg-primary-green hover:bg-transparent border hover:border-green-500 hover:text-primary-green"
              >
                Go home
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="py-2 px-3 flex flex-col items-center w-full">
            <p className="text-secondary-gray text-sm font-semibold">
              &copy; Copyright medconnect {new Date().getFullYear()} . All
              rights reserved
            </p>
          </div>
        </section>
      </body>
    </html>
  );
}
