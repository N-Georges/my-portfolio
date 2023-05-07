import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { BrandGithub, WorldWww } from "tabler-icons-react";
import { getProject, getProjects } from "../../../sanity/sanity-utils";
import { Project } from "../../../types/schema";
import Layout from "@/components/layout";
import Link from "next/link";

type ProjectProps = {
  params: {
    project: string;
  };
};

export default function Project({
  params,
  project,
}: ProjectProps & { project: Project }) {
  return (
    <Layout>
      <section className="max-w-screen-lg px-5 py-10 mx-auto">
        <div>
          <h1 className="text-3xl font-bold ">{project.name}</h1>
        </div>
        <div className="flex flex-col gap-2 py-5 sm:flex-row">
          <div className="relative w-full h-96">
            <Image
              src={`${project.image}`}
              alt={`${project.image?.alt}`}
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="mb-5 space-y-2">
          <div className="w-full space-y-2 ">
            <p className="text-xl font-semibold text-white ">Links</p>
            <div className="flex space-x-2 min-w-fit">
              <Link
                target="_blank"
                href={`${project.github}`}
                className="flex items-center justify-center w-12 h-12 transition-colors delay-150 border border-white rounded cursor-pointer hover:border-cyan-500"
              >
                <BrandGithub className="inline-block text-3xl " />
              </Link>
              <Link
                target="_blank"
                href={`${project.url}`}
                className="flex items-center justify-center w-12 h-12 transition-colors delay-150 border border-white rounded cursor-pointer hover:border-cyan-500"
              >
                <WorldWww className="inline-block text-3xl " />
              </Link>
            </div>
          </div>
          <p className="text-xl font-semibold text-white">Stack</p>
          <div className="flex space-x-2">
            {project.iconStack?.map((icon) => (
              <div key={icon._key} className="relative w-12 h-12 rounded ">
                <Image
                  src={`${icon}`}
                  alt={`${icon.alt}`}
                  fill
                  className="object-cover p-1 bg-white rounded"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xl font-semibold text-white">
            Overview project
          </p>
          <PortableText value={project.content?.map ? project.content : []} />
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const projects = await getProjects();
  const paths = projects.map((project) => ({
    params: { project: project.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: ProjectProps) {
  const slug = params.project;
  const project = await getProject(slug);

  return {
    props: { project },
  };
}
