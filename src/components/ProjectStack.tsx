import { Category, Project } from "../../types/schema";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { ArrowUpRight } from "tabler-icons-react";

type ProjectProps = {
  projects: Project[];
  categories: Category[];
};

const ProjectStack = ({ projects, categories }: ProjectProps) => {
  const [activeIndex, setActiveIndex] = useState(
    categories.findIndex((category) => category.name === "All")
  );

  const [projectFilter, setProjectFilter] = useState(projects);

  function handleCategoryClick(index: number) {
    setActiveIndex(index);
    setProjectFilter(
      projects.filter((project) => project.category === categories[index].name)
    );
    if (categories[index].name === "All") {
      setProjectFilter(projects);
    }
  }

  return (
    <>
      <div className="overflow-hidden scrollbar-hide">
        <div className="flex text-sm font-medium border-b border-gray-100">
          {categories.map((category, index) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(index)}
              className={clsx("p-4 -mb-px border-b border-current", {
                "text-cyan-500": activeIndex === index,
              })}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-4">
        {projectFilter.map((project: Project) => (
          <div
            key={project._id}
            className="relative block col-span-1 px-2 py-4 border-t-4 border-cyan-700 hover:border-cyan-500 sm:col-span-2 sm:p-6 lg:p-8"
          >
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white">
                <Link
                  className="hover:underline"
                  href={`/projects/${project.slug}`}
                >
                  {project.name}
                </Link>
              </h2>
              <div>
                <span className="text-xs font-medium text-cyan-500">
                  #{project.category as unknown as string}
                </span>
              </div>
            </div>
            <p className="mt-4 font-medium text-gray-500 line-clamp-3">
              {project.content && project.content[0].children[0].text}
            </p>
            <div className="flex items-center justify-between my-5">
              <div>
                <Link
                  target="_blank"
                  className="flex items-center w-full text-sm font-medium text-gray-500 rounded shadow hover:text-cyan-500 active:text-cyan-500 sm:w-auto"
                  href={`${project.github}`}
                >
                  <ArrowUpRight className="inline-block w-4 h-4 mr-2" />
                  <span>Github</span>
                </Link>
              </div>
              <div>
                <Link
                  target="_blank"
                  className="flex items-center w-full text-sm font-medium text-gray-500 rounded shadow hover:text-cyan-500 active:text-cyan-500 sm:w-auto"
                  href={`${project.url}`}
                >
                  <ArrowUpRight className="inline-block w-4 h-4 mr-2" />
                  <span>WWW</span>
                </Link>
              </div>
              <div>
                <Link
                  className="flex items-center w-full text-sm font-medium text-gray-500 rounded shadow hover:text-cyan-500 active:text-cyan-500 sm:w-auto"
                  href={`/projects/${project.slug}`}
                >
                  <ArrowUpRight className="inline-block w-4 h-4 mr-2" />
                  <span>See more</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectStack;
