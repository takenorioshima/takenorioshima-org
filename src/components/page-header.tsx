import Image from "next/image";

type Props = {
  title: string;
  description?: string;
  coverImage?: string;
  icon?: string;
  className?: string;
};

const PageHeader = ({ title, description, coverImage, icon, className }: Props) => {
  return (
    <div className={`post-header relative flex items-center md:min-h-[300px] pt-12 ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            className="block w-full h-full object-cover object-center"
            title={title}
            width={1200}
            height={630}
          />
        ) : null}
      </div>
      <div className="container max-w-screen-lg mx-auto flex flex-col h-full justify-center px-4 py-12">
        <h1 className="text-white text-4xl md:text-6xl font-semibold tracking-tighter leading-tight mb-5 text-center">
          {icon ? <i className={`bi ${icon} mr-3`}></i> : null}
          {title}
        </h1>
        {description ? <p className="text-white text-center">{description}</p> : null}
      </div>
    </div>
  );
};

export default PageHeader;
