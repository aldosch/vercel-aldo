import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <main>
      <div className="py-24 bg-white sm:py-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <p className="text-base font-semibold leading-7 text-green-500">
              Aldo Schumann
            </p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Vercel Familiarization Exercise 2023
            </h2>
            <Link href={"/question/1"}>
              <div className="flex items-center gap-2 p-4 mt-6 text-gray-800 transition-all duration-200 border hover:bg-green-200 rounded-xl hover:border-green-300 hover:shadow hover:text-black">
                View questions
                <ArrowRightIcon className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
