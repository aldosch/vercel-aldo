import "./globals.css";
import type { Metadata } from "next";
import Nav from "../components/Nav";
import type { NavStep } from "../components/Nav";

export const metadata: Metadata = {
  title: "Aldo Schumann",
  description: "Vercel Familiarization Exercise 2023",
};

const questions: NavStep[] = [
  {
    id: 1,
    question: "What do you want to learn or more of at work?",
    summary: "Learning goals at work",
    href: "learning-goals-at-work",
    status: "upcoming",
  },
  {
    id: 2,
    question:
      "Describe how you solved a challenge or technical issue that you faced in a previous role (preferably in a previous support role). How did you determine that your solution was successful?",
    summary: "Solving technical challenges",
    href: "solving-technical-challenges",
    status: "upcoming",
  },
  {
    id: 3,
    question:
      "How would you compare Next.js with another frontend framework? Feel free to compare with a framework of your choice.",
    summary: "Comparing Next.js with other frameworks",
    href: "comparing-nextjs-with-other-frameworks",
    status: "upcoming",
  },
  {
    id: 4,
    question:
      "When would you choose to use Edge Functions, Serverless Functions, or Edge Middleware with Vercel?",
    summary: "Choosing functions and middleware",
    href: "choosing-functions-and-middleware",
    status: "upcoming",
  },
  {
    id: 5,
    question:
      "Imagine a customer writes in requesting help with a build issue on a framework or technology that you've not seen before. How would you go about troubleshooting this and what questions would you ask the customer to understand the situation better?",
    summary: "Troubleshooting build issues",
    href: "troubleshooting-build-issues",
    status: "upcoming",
  },
  {
    id: 6,
    question:
      "The customer from question 5 replies to your response with the below:\n“I’m so frustrated. I’ve been trying to make this work for hours and I just can’t figure it out. It must be a platform issue so why don't you just fix it for me instead of asking me questions.”\nPlease write a follow-up reply to the customer.",
    summary: "Follow-up reply to frustrated customer",
    href: "follow-up-reply-frustrated-customer",
    status: "upcoming",
  },
  {
    id: 7,
    question:
      "A customer has a project on Vercel and they want to redirect the /blog path to another website. Please write a reply to the customer. Separately, list any relevant documentation you found and any feedback or information you’d like to share about your decision-making process.",
    summary: "Handling URL redirection for a customer project",
    href: "handling-url-redirection-customer-project",
    status: "upcoming",
  },
  {
    id: 8,
    question:
      "A customer is creating a site and would like their project not to be indexed by search engines. Please write a reply to the customer. Separately, list any relevant documentation you found and any feedback or information you’d like to share about your decision-making process.",
    summary: "Preventing search engine indexing",
    href: "preventing-search-engine-indexing",
    status: "upcoming",
  },
  {
    id: 9,
    question:
      "What do you think is one of the most common problems which customers ask Vercel for help with? How would you help customers to overcome common problems, short-term and long-term?",
    summary: "Handling common customer problems",
    href: "handling-common-customer-problems",
    status: "upcoming",
  },
  {
    id: 10,
    question: "How could we improve or alter this familiarization exercise?",
    summary: "Improving familiarization exercise",
    href: "improving-familiarization-exercise",
    status: "upcoming",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container grid grid-cols-12 mx-auto">
        <div className="col-start-1 col-end-4 p-2 bg-green-200">
          <Nav steps={questions} />
        </div>
        <div className="col-start-4 col-end-12 bg-blue-200">{children}</div>
      </body>
    </html>
  );
}
