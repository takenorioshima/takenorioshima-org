import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Project = {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    tags: string[];
    links: { name: string; url: string }[];
  };
};

export default function Modal({ project }: Project) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = (e) => {
    e.preventDefault();
    console.log(e.target.parent);
    setIsOpen(!isOpen);
  };

  const imagePath = (filename: string) => {
    return "/assets/projects/" + filename;
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden transition-all	duration-200">
      <Link href="#" onClick={toggleModal} key={project.id}>
        {project.image && (
          <Image
            src={imagePath(project.image as string)}
            alt={project.title}
            width={project.imageWidth}
            height={project.imageHeight}
          />
        )}
      </Link>
      <div className={!isOpen ? "hidden" : "p-4 block"}>
        <div className="text-xl font-semibold mb-3">{project.title}</div>
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
          {project.tags && (
            <div className="text-slate-500">
              {project.tags.map((tag) => (
                <span key={tag} className="inline-block mr-2 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
