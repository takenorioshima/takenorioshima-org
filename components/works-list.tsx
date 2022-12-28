import Container from "./container";
import Work from "../interfaces/work";
import Card from "../components/card";

type Props = {
  works: Work[];
};

const WorksList = ({ works }: Props) => {
  return (
    <section className="mb-32 pt-12">
      <Container>
        <h1 className="text-center my-10 text-3xl font-bold">WORKS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
          {works.map((work, index) => (
            <Card
              key={work.slug}
              title={work.title}
              tags={work.tags}
              coverImage={work.coverImage}
              date={work.date}
              slug={work.slug}
              excerpt={work.excerpt}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WorksList;
