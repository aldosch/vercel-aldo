import { questions } from "../data";
import Link from "next/link";

interface Props {
  id: number;
}

export default function QuestionCard(props: Props) {
  // offset because id starts at 1
  const item = questions[props.id - 1];
  return (
    <>
      <div className="border shadow rounded-xl w-fit">
        <div className="prose prose-code:bg-gray-100 prose-code:rounded prose-code:p-1 prose-code:text-gray-800 prose-code:font-normal prose-blockquote:">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <span className="inline-flex items-center px-2 py-1 mb-2 text-xs font-medium text-green-700 bg-green-100 rounded-full">
              Question {item?.id}
            </span>
            <h1 className="mb-0 text-xl font-semibold text-gray-900">
              {item?.question}
            </h1>
          </div>
          <div className="px-4 py-5 prose sm:px-6">{item?.answer}</div>
        </div>
      </div>
    </>
  );
}
