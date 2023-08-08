/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { isQuestion } from "../types";
import Image from "next/image";

export const questions: isQuestion[] = [
  {
    id: 1,
    question: "What do you want to learn or do more of at work?",
    summary: "Learning goals at work",
    answer: (
      <>
        <h4>Gain deep knowledge and muscle memory</h4>
        <p>
          I've spent most of my career at enterprise software agencies. One of
          the tradeoffs is that you rarely get to develop a deep understanding
          of specific platforms or tools before the next project kicks off.
        </p>
        <p>
          Getting the opportunity to become an expert on Vercel's platform and
          tools would be incredibly motivating. I want to gain muscle memory for
          common patterns, customer issues and frameworks.
        </p>
        <h4>Help developers do their best work</h4>
        <p>
          The magic that Vercel's abstraction layers provide has made my job as
          a frontend dev so much more enjoyable over the years. Fiddling with
          environment variables or build issues takes time away from making
          great user experiences. It would be satisfying to fix problems for
          technical people so they can focus on the work that makes a difference
          for their users.
        </p>

        <h4>Write great documentation</h4>
        <p>
          Vercel's efforts in the opensource community, particularly when it
          comes to tutorials and docs, has always impressed me. I'd appreciate
          (brutally honest) feedback on my technical writing and customer comms
          so that I can contribute to the resources that have taught me so much
          over the years.
        </p>
        <h4>Motivation mechanics</h4>
        <p>Some things bring me energy and joy every time I do them:</p>
        <ul>
          <li>
            Helping people with real world problems and learning about their
            passions
          </li>
          <li>
            Using interesting technology, especially once you get into flow
            state
          </li>
          <li>Finding pattern problems and solving them up the chain</li>
          <li>
            Drinking great coffee and using a standing desk so I can dance!
            🕺☕️
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    question:
      "Describe how you solved a challenge or technical issue that you faced in a previous role (preferably in a previous support role). How did you determine that your solution was successful?",
    summary: "Solving technical challenges",
    answer: (
      <>
        <h3>
          Responses from OpenAI failing to stream from GCP backend to Vercel
          frontend
        </h3>
        <h4>Issue overview</h4>
        <p>
          My team was building a chatbot to answer staff and customer questions.
          It sent the user's message along with context from our public
          knowledge base to OpenAI's GPT4 API. The response was meant to be
          streamed back to the user token by token, however the response would
          only be returned once every token had been received by the backend.
        </p>
        <p>
          This was a significant issue because responses would take an average
          of 8 seconds to return, sometimes up to 20 seconds. We were getting
          complaints from our testers and stakeholders.
        </p>
        <h4>Application structure</h4>
        <p>The application was made of the following pieces:</p>
        <ul>
          <li>
            <strong>Frontend</strong>: <code>Typescript React</code> app
            deployed to <code>Vercel</code>
          </li>
          <li>
            <strong>Backend</strong>: <code>Python3</code> app deployed to{" "}
            <code>Google Cloud Run</code>
            <ul>
              <li>
                Used <code>sanic</code> (similar to <code>FastAPI</code>),
                especially its streaming features
              </li>
              <li>
                Contextual content was indexed and queried using{" "}
                <code>faiss</code>
              </li>
            </ul>
          </li>
        </ul>
        <h3>Troubleshooting</h3>
        <h4>Local testing the frontend</h4>
        <p>
          We could see that the response was being streamed in the backend logs.
          We could also see that the frontend's websocket connection remained
          open until the full response was received by the backend. It would
          then dump the complete response into the UI.
        </p>
        <p>
          Curiously, when I ran the backend locally the response was streamed
          successfully without any delay. This led me to believe the issue had
          something to do with our VM rather than the frontend.
        </p>
        <h4>VM config</h4>
        <p>
          I compared the backend releases between the version that had streaming
          and the version that didn't. I couldn't find any significant
          differences or deviations from documentation best practices. I
          adjusted the streaming release to include a response before the tokens
          were meant to be streamed. This first response would come through but
          as soon as we requested data from OpenAI it would freeze.
        </p>
        <p>
          I spent some time investigating the <code>nginx</code> config. I even
          tried exposing <code>sanic</code> directly rather than behind{" "}
          <code>nginx</code> proxy but the issue persisted.
        </p>
        <p>
          I was able to reproduce the issue on a clean VM that had been cloned
          from an existing template that worked on different projects. This
          helped me to understand that the issue wasn't to do with the VM's
          configuration.
        </p>
        <h4>VM to VM streaming</h4>
        <p>
          To reduce complexity we created a new VM that had all app logic
          stripped out and would only stream a response to a request. This still
          failed to stream to the frontend. Out of curiosity I set up a second
          VM and attempted to <code>curl</code> the response from the first VM.
          This worked successfully which leads us to the network level config of
          our entire <code>GCP</code> project.
        </p>
        <p>
          Additional evidence for this came up when we tested the deployment on
          DigitalOcean without issue
        </p>
        <h4>GCP network level config</h4>
        <p>
          By this point the issue had been escalated and we were collaborating
          with support engineers from Google. We were able to walk them through
          the steps to replicate the issue. They double checked our VMs and we
          were able to show them that it wasn't related to the application's
          logic because it was working on DigitalOcean.
        </p>
        <p>
          Together we were able to investigate and determine that the issue was
          related to global load balancing rules which were withholding the
          response until all tokens were returned. We then made an exception for
          our VMs and the issue was finally resolved.
        </p>
        <h3>Conclusion</h3>
        <p>
          While we needed to escalate the issue my team was able to
          significantly reduce the issue scope and point the infrastructure
          support team in the right direction.
        </p>
        <p>
          To keep stakeholders happy during this process we were able to demo
          the app running locally (weren't able to use DigitalOcean due to
          vendor approval processes). This helped to keep the project moving
          forward in terms of response accuracy validation while we worked to
          solve the issue.
        </p>
      </>
    ),
  },
  {
    id: 3,
    question:
      "How would you compare Next.js with another frontend framework? Feel free to compare with a framework of your choice.",
    summary: "Comparing Next.js with other frameworks",
    answer: (
      <>
        <h3>Next.js vs SvelteKit</h3>
        Considering Vercel's significant role in the development of both of
        these technologies, it seemed appropriate to compare{" "}
        <code>Next.js</code> with <code>SvelteKit</code>.
        <h3>
          I'd like some{" "}
          <span style={{ textDecoration: "line-through" }}>
            cheese with my pasta
          </span>{" "}
          pasta with my cheese
        </h3>
        <p>
          Back in the day I loved making static sites with <code>Jekyll</code>.
          Writing templates in <code>Liquid</code> or <code>Nunjucks</code> felt
          efficient and intuitive. These projects had very little dynamic
          functionality and it was almost always enough to simply sprinkle some
          JS on top to get the job done.
        </p>
        <p>
          Today, working with <code>SvelteKit</code> feels very similar to my
          SSG / Jamstack days. I usually start writing components HTML first,
          sometimes not even adding <code>script</code> tags for simple pieces.
        </p>
        <p>
          This is quite a contrast from <code>Next.js</code> where the first
          thing I do is generate components using snippet extensions or JS
          patterns from memory. It takes a little more effort to get to writing
          JSX.
        </p>
        <p>
          There's no right or wrong way to do this. For developers like myself
          who started their career in the front-of-the-frontend<b>*</b>, a
          markup first approach can feel more natural. For complex webapps,
          there's a lot of benefit to writing JS first and maintaining
          consistency in well established <code>React</code> patterns.
        </p>
        <p className="text-xs text-gray-500">
          <b>*</b> See{" "}
          <Link href="https://css-tricks.com/the-great-divide/" target="_blank">
            The Great Divide
          </Link>{" "}
          from CSS Tricks for a brilliant discussion on this topic.
        </p>
        <h3>Big fish, fast fish</h3>
        <p>
          <code>Next.js</code> is a big fish. Building on the existing
          popularity and scale of <code>React</code> ecosystem its only natural
          that <code>Next.js</code> would be the market leader for fully fledged
          application boilerplates and frameworks.
        </p>
        <p>
          This scale has many benefits:
          <ul>
            <li>Large amounts of high quality documentation and tutorials</li>
            <li>Expansive plugin ecosystem</li>
            <li>Strong talent pool of experienced developers</li>
            <li>
              Higher degree of trust, allowing for smoother stakeholder approval
            </li>
          </ul>
        </p>
        <p>
          However this can also have drawbacks:
          <ul>
            <li>
              Bloat
              <ul>
                <li>
                  Considering how many millions of developers rely on the tool,
                  maintaining legacy functionality is incredibly important.
                  Additionally the volume of feature requests could contribute
                  to larger and larger package sizes.
                </li>
              </ul>
            </li>
            <li>
              Performance
              <ul>
                <li>
                  On a related note, due to the complexity of larger projects;
                  performance can be a bigger challenge. More dependencies to
                  worry about, more tech debt to work through before performance
                  gains can be realized.
                </li>
              </ul>
            </li>
            <li>
              Innovator's dilemma
              <ul>
                <li>
                  Large projects need to be slow and cautious in adopting new
                  patterns or technologies. This can lead to a slower pace of
                  innovation and could lead to decisions between an existing
                  abstraction or adopting new native browser features. For
                  example, virtual DOM vs native DOM.
                </li>
              </ul>
            </li>
          </ul>
        </p>
        <h3>Nuts and bolts</h3>
        <p>
          Getting into more specific details, there are some small yet
          significant differences between <code>Next.js</code> and{" "}
          <code>SvelteKit</code> from a technical perspective
        </p>
        <h4>Hot reloading</h4>
        <p>
          <code>SvelteKit</code> uses <code>Vite</code> out of the box which has
          hot reloading built in. While you can achieve this in{" "}
          <code>Next.js</code> with <code>Turbopack</code>, it isn't enabled by
          default
        </p>
        <h4>Weight</h4>
        <p>
          <code>SvelteKit</code> is a significantly smaller package taking up
          approximately 17% of the space <code>Next.js</code> requires.
        </p>
        <h4>OOTB forms, state management and animations</h4>
        <p>
          While there are equivalents for each of these features in the{" "}
          <code>Next.js</code> ecosystem (eg. <code>Zustand</code> or{" "}
          <code>Formik</code>), these are out-of-the-box in{" "}
          <code>SvelteKit</code>.
        </p>
        <h4>OOTB image handling</h4>
        <p>
          <code>Next.js</code> wins this one thanks to the{" "}
          <code>next/image</code> feature.
        </p>
        <h4>Accessibility hints</h4>
        <p>
          <code>SvelteKit</code> has a built in A11y console hints. This is
          minor though considering that there are many well established{" "}
          <code>eslint</code> configs to handle this on the <code>Next.js</code>{" "}
          side.
        </p>
        <h3>Conclusion</h3>
        <p>
          Developers love to argue about their tools and honestly I think that's
          a good thing. It exposes us to new ideas and potentially sheds light
          on flaws in our current approaches.
        </p>
        <Image
          src={"/wow-fuck-that-guy.jpg"}
          alt={
            "the famous 'wow fuck that guy' comic where a guy finds a flag on the ground"
          }
          width={922}
          height={1390}
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          Source{" "}
          <Link
            href="https://www.extrafabulouscomics.com/archive"
            target="_blank"
          >
            Extra Fabulous Comics
          </Link>
        </p>
        <p>
          You can build wonderful applications with each of these technologies
          and it really comes down to personal preference. Use the tool that
          you're most productive with because at the end of the day our users
          only care about having a great UX.
        </p>
        <hr />
        <h3>Additional notes</h3>
        <h4>Frameworks vs meta-frameworks</h4>
        <p>
          The word <code>framework</code> can feel like a tricky thing to
          define. When does a project go from a tool or library to a framework?
        </p>
        <p>
          While we commonly hear technologies like <code>React</code> or{" "}
          <code>Svelte</code> referred to as frameworks, they could be
          classified as UI libraries considering the scope of their
          functionality often ends when it comes to server side, routing or even
          SEO best practice.
        </p>
        <p>
          So what do we call the tools like <code>Next.js</code> that handle it
          all? A more accurate term might be <code>meta-framework</code>.
        </p>
        <h4>The big four and their meta counterparts</h4>
        <p>
          Based on{" "}
          <Link
            href="https://npmtrends.com/angular-vs-react-vs-svelte-vs-vue"
            target="_blank"
          >
            npm trends
          </Link>
          ,{" "}
          <Link
            href="https://survey.stackoverflow.co/2023/#web-frameworks-and-technologies"
            target="_blank"
          >
            Stackoverflow's 2023 Developer Survey
          </Link>{" "}
          and{" "}
          <Link
            href="https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/#front_end_frameworks_experience_linechart"
            target="_blank"
          >
            State of JS 2022
          </Link>{" "}
          the following frameworks continue to be the most popular.
        </p>
        <ul>
          <li>
            <code>React</code> 👉 <code>Next</code>
          </li>
          <li>
            <code>Angular</code> <b>*</b>
          </li>
          <li>
            <code>Vue</code> 👉 <code>Nuxt</code>
          </li>
          <li>
            <code>Svelte</code> 👉 <code>SvelteKit</code>
          </li>
        </ul>
        <p className="text-xs text-gray-500">
          <b>*</b> Angular is already a meta-framework, especially considering
          things like{" "}
          <Link href="https://angular.io/guide/universal" target="_blank">
            Angular Universal
          </Link>
        </p>
        <p>
          Its worth noting that <code>Preact</code> has noteworthy popularity
          but I consider it closely related to the <code>React</code> ecosystem
          considering their shared API.
        </p>
        <p>
          Additionally, <code>Angular</code> popularity continues to decline
          although based on its significant enterprise usage and backing by
          Google I'm sure it will remain an in-demand technology.
        </p>
      </>
    ),
  },
  {
    id: 4,
    question:
      "When would you choose to use Edge Functions, Serverless Functions, or Edge Middleware with Vercel?",
    summary: "Choosing functions and middleware",
    answer: <p>Answer content 4</p>,
  },
  {
    id: 5,
    question:
      "Imagine a customer writes in requesting help with a build issue on a framework or technology that you've not seen before. How would you go about troubleshooting this and what questions would you ask the customer to understand the situation better?",
    summary: "Troubleshooting build issues",
    answer: <p>Answer content 5</p>,
  },
  {
    id: 6,
    question:
      "The customer from question 5 replies to your response with the below:\n“I’m so frustrated. I’ve been trying to make this work for hours and I just can’t figure it out. It must be a platform issue so why don't you just fix it for me instead of asking me questions.”\nPlease write a follow-up reply to the customer.",
    summary: "Follow-up reply to frustrated customer",
    answer: <p>Answer content 6</p>,
  },
  {
    id: 7,
    question:
      "A customer has a project on Vercel and they want to redirect the /blog path to another website. Please write a reply to the customer. Separately, list any relevant documentation you found and any feedback or information you’d like to share about your decision-making process.",
    summary: "Handling URL redirection for a customer project",
    answer: <p>Answer content 7</p>,
  },
  {
    id: 8,
    question:
      "A customer is creating a site and would like their project not to be indexed by search engines. Please write a reply to the customer. Separately, list any relevant documentation you found and any feedback or information you’d like to share about your decision-making process.",
    summary: "Preventing search engine indexing",
    answer: <p>Answer content 8</p>,
  },
  {
    id: 9,
    question:
      "What do you think is one of the most common problems which customers ask Vercel for help with? How would you help customers to overcome common problems, short-term and long-term?",
    summary: "Handling common customer problems",
    answer: <p>Answer content 9</p>,
  },
  {
    id: 10,
    question: "How could we improve or alter this familiarization exercise?",
    summary: "Improving familiarization exercise",
    answer: <p>Answer content 10</p>,
  },
];
