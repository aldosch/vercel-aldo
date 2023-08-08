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
          Because <code>Svelte</code> has a much smaller ecosystem, it doesn't
          enjoy these benefits of scale.
        </p>
        <p>
          However scale can also have drawbacks:
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
          Its worth mentioning that <code>Preact</code> has noteworthy
          popularity but I consider it closely related to the <code>React</code>{" "}
          ecosystem considering their shared API.
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
    answer: (
      <>
        <p>
          These compute options have their own pros and cons, even if you may be
          able to achieve similar functionality with each.
        </p>
        <h3>What are they?</h3>
        <h4>Serverless Functions</h4>
        <ul>
          <li>
            Essentially a <code>lambda</code>
            <ul>
              <li>
                Reduces infrastructure management overhead because teams no
                longer need to manage a server
              </li>
              <li>Allows for dynamic scaling</li>
              <li>
                Supports a variety of runtimes including community ones like{" "}
                <code>Deno</code>
              </li>
            </ul>
          </li>
          <li>Runs in a specific region</li>
        </ul>
        <h4>Edge Functions</h4>
        <ul>
          <li>
            Same as a <code>Serverless Function</code> except it runs on a CND
            edge node across many regions
          </li>
          <li>Reduces latency by selecting the closest node to the user</li>
        </ul>
        <h4>Edge Middleware</h4>
        <ul>
          <li>
            Similar to an <code>Edge Function</code> except that it{" "}
            <b>runs before requests are processed</b> by the site.
          </li>
          <li>
            Helps with different use cases like redirects or A/B testing where
            we want to send the user's request to a different release of the
            site.
          </li>
        </ul>
        <h3>How do I choose?</h3>
        <p>
          It depends on which stage of the request lifecycle we want to execute
          our function as well as location specific performance needs.
        </p>
        <p>
          With <code>Edge Middleware</code> we could dynamically and
          dramatically personalize the user's experience by swapping out major
          portions of the application or directing them to completely different
          deployments.
        </p>
        <p>
          Both <code>Serverless</code> and <code>Edge</code> functions could get
          the job done but its important to consider which is most appropriate
          for your use case and your users locations.
        </p>
        <p>
          If you're curious... here's a helpful diagram I stole from the Vercel
          docs 😁
        </p>
        <Image
          src="/vercel-infra-overview.png"
          alt="Edge Middleware location within Vercel infrastructure."
          width={960}
          height={350}
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          Source{" "}
          <Link
            href="https://vercel.com/docs/concepts/functions/edge-middleware"
            target="_blank"
          >
            Edge Middleware Overview
          </Link>
        </p>
        <h4>A note on cache</h4>
        <p>
          Its hard to talk about the Edge without mentioning caching. One of the
          reasons why Vercel hosted apps feel so snappy is thanks to{" "}
          <code>Edge Network Caching</code> enabled by default for many types of
          projects.
        </p>
      </>
    ),
  },
  {
    id: 5,
    question:
      "Imagine a customer writes in requesting help with a build issue on a framework or technology that you've not seen before. How would you go about troubleshooting this and what questions would you ask the customer to understand the situation better?",
    summary: "Troubleshooting build issues",
    answer: (
      <ol>
        <li>
          Gather context
          <ul>
            <li>Read their message in detail</li>
            <li>
              Read their build logs and start making notes on the nature of the
              error
            </li>
            <li>
              Check their deployment history to see if there's an earlier
              release which was working
            </li>
            <li>Read the framework docs</li>
          </ul>
        </li>
        <li>
          Compile notes and write questions for the customer to uncover
          potentially missing details. For example:
          <ul>
            <li>
              If I can't access their repository, request access to reverse
              engineer and understand details like their{" "}
              <code>package.json</code>
            </li>
            <li>
              If the issue is to do with a dependency, ask them to confirm the
              version of the dependency that they need and whether they could
              consider different versions
            </li>
            <li>
              If the issue is to do with environment variables, ask them if
              they've been able to test this with a local build using the same
              credentials or potentially generate new credentials
            </li>
          </ul>
        </li>
        <li>
          Read more with the additional context and hopefully after narrowing
          the scope of the issue
          <ul>
            <li>
              See if there are any issues in the framework's repo that match the
              build error messages
            </li>
            <li>
              Look for similar build errors from other frameworks if there are
              no relevant issues
            </li>
            <li>
              Check recent release notes for any key dependencies, especially if
              there have been recent major releases
            </li>
            <li>
              Query existing resolved cases for similar issues from other
              customers
            </li>
          </ul>
        </li>
        <li>
          Attempt to recreate the issue
          <ul>
            <li>
              If this is a truly new framework, potentially spin up a simple
              proof-of-concept (POC) project and see if I'm able to deploy it
              successfully
            </li>
            <li>
              If they've configured their repo in a unique way, see if I can
              produce the same issues on the POC or see what happens when we
              adjust their config to be more standard
            </li>
          </ul>
        </li>
      </ol>
    ),
  },
  {
    id: 6,
    question:
      "The customer from question 5 replies to your response with the below:\n“I’m so frustrated. I’ve been trying to make this work for hours and I just can’t figure it out. It must be a platform issue so why don't you just fix it for me instead of asking me questions.”\nPlease write a follow-up reply to the customer.",
    summary: "Follow-up reply to frustrated customer",
    answer: (
      <>
        <p>
          Hi <code>FirstName</code>,
        </p>
        <p>
          I understand this is a frustrating situation and I'd like to help get
          your project up and running as quickly as possible.
        </p>
        <p>
          If you're able to answer some of the previous questions or supply
          additional context it would be greatly appreciated. We could also book
          a short call to go through this together while screen sharing if
          that's easier.
        </p>
        <p>
          Based on our initial investigation it looks like this issue has
          something to do with the project's configuration, specifically the
          build step.
        </p>
        <p>
          It looks like this problem first appeared after the deployment on{" "}
          <code>DateTime</code> so if you're under time pressure you could
          consider rolling back to the previous release and implementing your
          changes on a separate branch.
        </p>
        <p>
          I attempted to deploy a fresh project using the same framework. This
          deployment went through successfully and you can see my config here:{" "}
          <code>link-to-config</code>
        </p>
        <p>
          Please let me know if you have any other questions or clarifications.
          I'd be happy to help.
        </p>
        <p>
          Thanks,
          <br />
          Aldo
        </p>
      </>
    ),
  },
  {
    id: 7,
    question:
      "A customer has a project on Vercel and they want to redirect the /blog path to another website. Please write a reply to the customer. Separately, list any relevant documentation you found and any feedback or information you’d like to share about your decision-making process.",
    summary: "Handling URL redirection for a customer project",
    answer: (
      <>
        <p>
          Hi <code>FirstName</code>,
        </p>
        <p>
          Thanks for reaching out. I'd be happy to help you set up redirects for
          your blog.
        </p>
        <p>
          If you're using Next.js you can configure redirects in the{" "}
          <code>next.config.js</code> file, otherwise you can use a{" "}
          <code>vercel.json</code> config file in the root of your project
          directory.
        </p>
        <p>Here's an example of how to achieve this in Next.js</p>
        <pre>
          {`// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "https://my-new-blog.vercel.app",
        permanent: true,
      },
    ];
  },
};
`}
        </pre>
        <p>
          You can read more about this in the{" "}
          <Link
            href="https://nextjs.org/docs/pages/api-reference/next-config-js/redirects"
            target="_blank"
          >
            Next.js documentation
          </Link>
        </p>
        <p>
          And here's the same example using <code>vercel.json</code> for other
          frameworks
        </p>
        <pre>
          {`// vercel.json
{
  "redirects": [
    {
      "source": "/blog",
      "destination": "https://my-new-blog.vercel.app",
      "permanent": true,
    }
  ]
}`}
        </pre>
        <p>
          You can read more about this in the{" "}
          <Link
            href="https://vercel.com/docs/concepts/projects/project-configuration#redirects"
            target="_blank"
          >
            Vercel config redirect documentation
          </Link>
        </p>
        <p>
          If you're only redirecting traffic temporarily consider changing the{" "}
          <code>permanent</code> attribute to <code>false</code>.
        </p>
        <p>
          Please note that by default, all query strings that are found in the
          source path will be passed to the destination path. For example if
          someone goes to:
        </p>
        <pre>
          {`https://my-website.vercel.app/blog/my-post-title?utm_source=google`}
        </pre>
        <p>They will be redirected to:</p>
        <pre>
          {`https://my-new-blog.vercel.app/my-post-title?utm_source=google`}
        </pre>
        <p>
          There's more information on this available in our guides:{" "}
          <Link
            href="https://vercel.com/guides/how-do-i-perform-vercel-redirects-based-on-query-strings"
            target="_blank"
          >
            How do I perform Vercel redirects based on query strings?
          </Link>
        </p>
        <p>
          Finally, there are more redirect options available leveraging our{" "}
          <code>Edge Functions</code> or <code>Edge Middleware</code> features.{" "}
          <Link
            href="https://vercel.com/docs/concepts/edge-network/redirects"
            target="_blank"
          >
            You can read more about this in our documentation.
          </Link>
          .
        </p>
        <p>
          Thanks,
          <br />
          Aldo
        </p>
      </>
    ),
  },
  {
    id: 8,
    question:
      "A customer is creating a site and would like their project not to be indexed by search engines. Please write a reply to the customer. Separately, list any relevant documentation you found and any feedback or information you’d like to share about your decision-making process.",
    summary: "Preventing search engine indexing",
    answer: (
      <>
        <p>
          Hi <code>FirstName</code>,
        </p>
        <p>
          Thanks for reaching out, that's a great question. I'd be happy to help
          you prevent your project from being indexed by search engines.
        </p>
        <p>
          We should be able to achieve this by modifying the{" "}
          <code>X-Robots-Tag</code> in the website's response headers.
        </p>
        <p>
          If you're using a framework like Next.js its best to use the{" "}
          <code>next.config.js</code> file. Here's an example:
        </p>
        <pre>
          {`// next.config.js
module.exports = {
  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
 };`}
        </pre>
        <p>
          Alternatively, This can be set up in the <code>vercel.json</code> file
          in the root of your project directory. However, please note that using
          your framework's built-in methods to inject headers is always
          recommended and doing so through <code>vercel.json</code> should only
          be as a last resort and may lead to other problems.
        </p>
        <p>
          This is what your <code>vercel.json</code> could look like. You will
          need to replace <code>example.com</code> with your own domain name.
        </p>
        <pre>
          {`{
  "headers": [
    {
      "source": "/",
      "has": [
        {
          "type": "host",
          "value": "example.com"
        }
      ],
      "headers" : [
        {
          "key" : "X-Robots-Tag",
          "value" : "noindex"
        }
      ]
    }
  ]
}`}
        </pre>
        <p>
          You can read more about how to configure the <code>header</code>{" "}
          object in{" "}
          <Link
            href="https://vercel.com/docs/concepts/projects/project-configuration#headers"
            target="_blank"
          >
            our documentation here
          </Link>
          .
        </p>
        <p>
          Once you've deployed your changes you can test if it worked using{" "}
          <code>curl</code> in your terminal like this:
        </p>
        <pre>{`curl -Is https://vercel.com | grep -q 'x-robots-tag' && echo "✅ Indexing successfully disabled! Found x-robots-tag" || echo "❌ Indexing is still active! x-robots-tag not found"`}</pre>
        <p>
          If you don't have <code>curl</code> installed you can also check in
          the browser's dev tools under the <code>Network</code> tab.
        </p>
        <p>
          In Chrome you can find this by right clicking anywhere on the page and
          selecting <code>Inspect</code> and then navigating to{" "}
          <code>Network</code>, selecting <code>All</code> and then clicking on
          the first item in the list of loaded content. There should be a{" "}
          <code>Headers</code> tab where you can see{" "}
          <code>Request Headers</code>.
        </p>
        <p>
          You can read more about search engine indexing in our guides:{" "}
          <Link
            href="https://vercel.com/guides/are-vercel-preview-deployment-indexed-by-search-engines#x-robots-tag-header"
            target="_blank"
          >
            Are Vercel Preview Deployments indexed by search engines?
          </Link>
        </p>
        <p>Feel free to send me a reply if you have any further questions.</p>
        <p>
          Thanks,
          <br />
          Aldo
        </p>
      </>
    ),
  },
  {
    id: 9,
    question:
      "What do you think is one of the most common problems which customers ask Vercel for help with? How would you help customers to overcome common problems, short-term and long-term?",
    summary: "Handling common customer problems",
    answer: (
      <>
        <h4>Where's the complexity?</h4>
        <p>
          When I consider which areas of Vercel's product could have the most
          complexity I immediately think of the build step.
        </p>
        <p>
          There's not much variation when it comes to configuring domains,
          authenticating with github or toggling out-of-the-box settings on and
          off. There's an incredible amount of variations when it comes to how
          you build and configure web application which could lead to an
          interesting variety of issues.
        </p>
        <p>
          This is also because we're not just supporting Vercel code but
          indirectly supporting third party libraries, frameworks and customer's
          custom implementations.
        </p>
        <h4>How could I help customers overcome common problems?</h4>
        <p>
          I'm particularly interested in common problems, in fact I referred to
          them as "pattern problems" in{" "}
          <Link href={"/question/1"}>my answer to question 1</Link>. The beauty
          of these issues is that the same solution can often be shared with
          multiple customers at once.
        </p>
        <p>
          For example, if we detect a common issue that occurs within the new
          release of a particular framework, we could consider:
          <p>Short term</p>
          <ul>
            <li>
              Query existing open cases for keywords relating to the issue and
              framework to quickly resolve what are essentially duplicate cases
            </li>
            <li>
              Update any documentation we have on that particular framework.
            </li>
            <li>
              Depending on the significance of the issue we could preemptively
              send out comms or display an alert within the UI for customers who
              use the framework
            </li>
          </ul>
          <p>Long term</p>
          <ul>
            <li>
              If the framework is opensource I could submit an issue or raise a
              pull request to update the framework's documentation (assuming the
              issue is not Vercel specific)
            </li>
            <li>
              If there are potential enhancements to our product's UX that could
              reduce the likelihood of the issue reoccurring I could meet with
              the product team to discuss / raise a feature request
            </li>
            <li>
              Set up filters or additional tagging within our ticketing system
              to identify issues that likely relate to the known issue and
              suggest a templated solution response allowing our support staff
              to resolve these issues more quickly
            </li>
          </ul>
        </p>
      </>
    ),
  },
  {
    id: 10,
    question: "How could we improve or alter this familiarization exercise?",
    summary: "Improving familiarization exercise",
    answer: (
      <>
        <p>
          I genuinely enjoyed working on this exercise. The questions were
          interesting and it gave me an opportunity to learn about some Next.js
          features I hadn't used before.
        </p>
        <p>
          The only thing that could make this even better would be a real
          example problem to solve. It felt slightly awkward writing a reply for
          a hypothetical issue in <Link href={"/question/5"}>question 5</Link>.
          Overall a minor improvement though.
        </p>
        <p>
          To be honest, I spent more than 3 hours on the task because I was
          having fun. Keep up the great work hiring team! 😊
        </p>
        <p>
          Kind regards,
          <br />
          Aldo Schumann
        </p>
      </>
    ),
  },
];
