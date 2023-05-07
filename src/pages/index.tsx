import Layout from "@/components/layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <section>
        <div className="px-5 py-20 mx-auto max-w-screen-2xl sm:py-32 lg:flex lg:items-center">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Hey, I&apos;m Georges
            </h1>
            <h1 className="text-3xl font-extrabold text-cyan-500 sm:text-5xl sm:block">
              Developer React.js/Node.js
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Welcome to my portfolio! I am a junior developer with a passion
              for React.js and Node.js. I have a strong affinity for back-end
              development, but I also enjoy front-end work.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
