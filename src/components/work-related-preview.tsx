import Link from "next/link";
import Image from "next-export-optimize-images/image";
import Work from "@/interfaces/work";

const WorkRelatedPreview = ({ title, slug, images, youTubeId, cover, appleMusic }: Work) => {
  const imageFile = cover ? cover : images[0];
  return (
    <div className="col-span-1 lg:col-span-2 opacity-0" data-aos="fade-in">
      <Link
        as={`/works/${slug}`}
        href="/works/[slug]"
        className={`h-full col-span-1 lg:col-span-2 flex lg:block items-center rounded-lg bg-white overflow-hidden drop-shadow-sm hover:shadow-xl transition-shadow duration-200`}
      >
        <Image
          src={`/assets/works/${slug}/${imageFile}`}
          alt={`Cover Image for ${slug}`}
          className={"aspect-square object-cover object-center w-28 lg:w-100 flex-none"}
          width={1200}
          height={1200}
        />
        <div className="p-3 lg:p-5">
          <h3 className="text-md lg:text-lg font-semibold leading-tight">
            {youTubeId && <i className="bi bi-play-circle-fill mr-1" />}
            {appleMusic && <i className="bi bi-music-note-beamed mr-1" />}
            {title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default WorkRelatedPreview;
