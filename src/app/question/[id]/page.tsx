import Nav from "@/components/Nav";
import QuestionCard from "@/components/QuestionCard";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Props {
  params: { id: number };
}

export default function Page(props: Props) {
  const nextQuestion = +props.params.id + 1;
  return (
    <>
      <div className="">
        <Nav activeStep={props.params.id} />
      </div>
      <div className="p-2 md:p-4">
        <QuestionCard id={props.params.id} />
        <div className="flex items-center justify-between w-full mb-8">
          <p className="pt-8 text-sm font-medium text-green-500">
            Aldo Schumann <br />{" "}
            <span className="font-normal text-gray-400">
              Vercel Familiarization Exercise 2023
            </span>
          </p>
          <Link
            href={
              (props.params.id < 10 && "/question/" + nextQuestion) ||
              "mailto:work@aldo.io?subject=Vercel Familiarization Exercise 2023"
            }
          >
            <button
              type="button"
              className="flex items-center gap-2 p-4 mt-6 text-gray-800 transition-all duration-200 border hover:bg-green-200 rounded-xl hover:border-green-300 hover:shadow hover:text-black"
            >
              {(props.params.id < 10 && "Question " + nextQuestion) ||
                "Send me an email :)"}
              {props.params.id < 10 && (
                <ArrowRightIcon
                  className="-mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
              )}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
