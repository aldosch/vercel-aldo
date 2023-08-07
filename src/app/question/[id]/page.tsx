import Nav from "@/components/Nav";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";

interface Props {
  params: { id: number };
}

export default function Page(props: Props) {
  return (
    <>
      <div className="">
        <Nav activeStep={props.params.id} />
      </div>
      <div className="p-4">
        <QuestionCard id={props.params.id} />
      </div>
    </>
  );
}
