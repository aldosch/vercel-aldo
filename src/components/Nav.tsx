import { CheckCircleIcon, HomeIcon } from "@heroicons/react/20/solid";
import { questions } from "../data";
import { isQuestion } from "../types";
import Link from "next/link";
interface Props {
  steps?: isQuestion[];
  activeStep: number;
}

export default function Nav({ steps = questions, activeStep }: Props) {
  return (
    <div className="flex flex-col flex-grow-0 px-4 py-10 overflow-y-auto bg-white gap-y-5">
      <Link href="/">
        <span className="text-gray-400 hover:text-gray-500">
          <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </span>
      </Link>
      <nav className="flex justify-center mt-4" aria-label="Questions">
        <ol role="list" className="space-y-6">
          {steps?.map((step) => (
            <li key={step.id}>
              {step.id < activeStep ? (
                <a href={"/question/" + step.id} className="group">
                  <span className="flex items-start">
                    <span className="relative flex items-center justify-center flex-shrink-0 w-5 h-5">
                      <CheckCircleIcon
                        className="w-full h-full text-green-500 transition-all duration-200 group-hover:text-green-600"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-400 transition-all duration-200 group-hover:text-gray-500">
                      {step.summary}
                    </span>
                  </span>
                </a>
              ) : step.id == activeStep ? (
                <a
                  href={"/question/" + step.id}
                  className="flex items-start"
                  aria-current="step"
                >
                  <span
                    className="relative flex items-center justify-center flex-shrink-0 w-5 h-5"
                    aria-hidden="true"
                  >
                    <span className="absolute w-4 h-4 bg-green-100 rounded-full" />
                    <span className="relative block w-2 h-2 bg-green-500 rounded-full" />
                  </span>
                  <span className="ml-3 text-sm font-medium text-green-600">
                    {step.summary}
                  </span>
                </a>
              ) : (
                <a href={"/question/" + step.id} className="group">
                  <div className="flex items-start">
                    <div
                      className="relative flex items-center justify-center flex-shrink-0 w-5 h-5"
                      aria-hidden="true"
                    >
                      <div className="w-2 h-2 transition-all duration-200 bg-gray-300 rounded-full group-hover:bg-gray-400" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-500 transition-all duration-200 group-hover:text-gray-900">
                      {step.summary}
                    </p>
                  </div>
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
