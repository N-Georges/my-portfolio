import Layout from "@/components/layout";

export default function About() {
  return (
    <Layout>
      <section>
        <div className="max-w-screen-lg px-5 py-10 mx-auto ">
          <h1 className="text-5xl font-bold">About Me</h1>
          <p className="my-5 text-gray-100">Hey, I&apos;m Georges</p>
          <div className="prose text-gray-100 prose-neutral prose-invert">
            <p className="mt-8">
              My career path has allowed me to work on various projects that
              have allowed me to develop my skills in programming, problem
              solving and collaboration with multidisciplinary teams. I love
              learning new technologies and I am always looking for new
              challenges to continue my professional development.
            </p>
            <p className="my-8">
              In addition to my development skills, I am also interested in
              DevOps practices. I believe that adopting these practices can
              significantly improve the application development and deployment
              process. I am currently exploring DevOps related tools and
              practices to improve my skills as a developer.
            </p>

            <p className="mb-8">
              All in all, I am a passionate developer who is always looking for
              new opportunities to learn and grow in this exciting field.
              I&apos;m open to new projects and collaborations, so don&apos;t
              hesitate to contact me if you are interested in working with me.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
