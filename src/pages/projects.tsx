import { projectData } from "../data/projects";
import Layout from "../components/layouts/default";
import { SITE_NAME } from "../lib/constants";
import { NextSeo } from "next-seo";
import Image from "next/image";
import PageHeader from "../components/page-header";
import Link from "next/link";

const Projects = () => {
  const title = `Projects - ${SITE_NAME}`;
  const imagePath = (filename: string) => {
    return "/assets/projects/" + filename;
  };
  return (
    <Layout>
      <NextSeo title={title} />
      <PageHeader title="Projects" className="bg-gray-600" />
      <div className="grid grid-flow-row-dense grid-cols-2 md:grid-cols-6 gap-6 m-6">
        {projectData &&
          projectData.map((project) => (
            <div className={`bg-slate-300 rounded-lg shadow-md overflow-hidden ${project.class}`} key={project.id}>
              {project.image && (
                <Image
                  src={imagePath(project.image as string)}
                  alt={project.title}
                  width={project.imageWidth}
                  height={project.imageHeight}
                />
              )}
              <div className="hidden">
                <div className="font-semibold">{project.title}</div>
                {project.links && (
                  <ul>
                    {project.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.url}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
                {project.tags && (
                  <ul>
                    {project.tags.map((tag) => (
                      <li key={tag} className="inline-block mr-1 text-sm">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Projects;
