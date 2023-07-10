import { projectData } from "../data/projects";
import Masonry from "react-masonry-css";
import Layout from "../components/layouts/default";
import { SITE_NAME } from "../lib/constants";
import { NextSeo } from "next-seo";
import PageHeader from "../components/page-header";
import Modal from "../components/modal";

const Projects = () => {
  const title = `Projects - ${SITE_NAME}`;
  return (
    <Layout>
      <NextSeo title={title} />
      <PageHeader title="Projects" className="bg-gray-600" />
      <div className="m-[1rem]">
        <Masonry breakpointCols={3} className="masonry-grid" columnClassName="masonry-grid-column">
          {projectData && projectData.map((project) => <Modal key={project.id} project={project} />)}
        </Masonry>
      </div>
    </Layout>
  );
};

export default Projects;
