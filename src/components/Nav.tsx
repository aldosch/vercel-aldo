import { CheckCircleIcon } from "@heroicons/react/20/solid";

export interface NavStep {
  id: number;
  question: string;
  summary: string;
  href: string;
  status: "complete" | "current" | "upcoming";
}

interface Props {
  steps: NavStep[];
}

export default function Nav({ steps }: Props) {
  return (
    <div className="flex flex-col flex-grow-0 px-10 py-10 overflow-y-auto bg-white border-r border-gray-200 gap-y-5">
      <nav className="flex justify-center" aria-label="Questions">
        <ol role="list" className="space-y-6">
          {steps?.map((step) => (
            <li key={step.id}>
              {step.status === "complete" ? (
                <a href={step.href} className="group">
                  <span className="flex items-start">
                    <span className="relative flex items-center justify-center flex-shrink-0 w-5 h-5">
                      <CheckCircleIcon
                        className="w-full h-full text-indigo-600 group-hover:text-indigo-800"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.summary}
                    </span>
                  </span>
                </a>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  className="flex items-start"
                  aria-current="step"
                >
                  <span
                    className="relative flex items-center justify-center flex-shrink-0 w-5 h-5"
                    aria-hidden="true"
                  >
                    <span className="absolute w-4 h-4 bg-indigo-200 rounded-full" />
                    <span className="relative block w-2 h-2 bg-indigo-600 rounded-full" />
                  </span>
                  <span className="ml-3 text-sm font-medium text-indigo-600">
                    {step.summary}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group">
                  <div className="flex items-start">
                    <div
                      className="relative flex items-center justify-center flex-shrink-0 w-5 h-5"
                      aria-hidden="true"
                    >
                      <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
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
