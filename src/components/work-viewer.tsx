import Image from "next-export-optimize-images/image";

type Props = {
  slug: string;
  images: string[];
};

export default function WorkViewer({ slug, images }: Props) {
  return (
    <section className="work-viewer">
      {images.map((image) => (
        <div className="embla__slide">
          <Image
            src={"/assets/works/" + slug + "/" + image}
            alt={`Cover Image for ${slug}`}
            className={"relative! w-full object-contain object-center"}
            fill
          />
        </div>
      ))}
    </section>
  );
}
