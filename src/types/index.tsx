export type isQuestion = {
  id: number;
  status?: "complete" | "current" | "upcoming";
  question: string;
  summary: string;
  answer?: React.ReactNode;
};

export type isStatus = {
  id: number;
  status: "complete" | "current" | "upcoming";
};
