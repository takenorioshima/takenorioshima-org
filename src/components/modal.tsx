import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Project = {
  project: {
    slug: string;
    title: string;
    description: string;
    year: number;
    imageWidth: number;
    imageHeight: number;
    tags: string[];
    links: { name: string; url: string }[];
  };
};

export default function Modal({ project }: Project) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const imagePath = (slug: string) => {
    return "/assets/projects/" + slug + ".jpg";
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200">
      <Link href="#" onClick={toggleModal} key={project.slug}>
        {project.slug && (
          <Image
            src={imagePath(project.slug as string)}
            alt={project.title}
            width={project.imageWidth}
            height={project.imageHeight}
            className="block w-100"
          />
        )}
      </Link>
      <div className={!isOpen ? "hidden" : "p-4 block bg-white"}>
        <div className="text-xl font-bold mb-3">{project.title}</div>
        {project.tags && (
          <div className="text-slate-800 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="inline-block bg-slate-200 border rounded py-[0.1rem] px-1 mr-2 mb-2 text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="">
          {project.description && <p className="text-sm mb-3">{project.description}</p>}
          {project.links && (
            <div className="mb-3">
              {project.links &&
                project.links.map((link) => (
                  <Link key={link.name} href={link.url} className="inline-block mr-2" target="_blank">
                    <i className="bi bi-link-45deg"></i>
                    <span className="font-semibold">{link.name}</span>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
