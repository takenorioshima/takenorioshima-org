import { useFlippingTitle } from "@/hooks/useFlippingTitle";

type Props = {
  title: string;
  tags?: string[];
};

export const WorkHeader = ({ title, tags }: Props) => {
  return (
    <div className="container max-w-(--breakpoint-xl) mx-auto px-3">
      <div className="pt-20 border-b border-slate-300 md:flex items-center place-content-between">
        <div>
          <div className="mb-2">
            わたしの
            <ruby className="font-bold tracking-wider relative">
              <span className="works-header-wrapper relative">
                <span className="js-works-header-serve works-header active">仕</span>
                <span className="absolute left-0 js-works-header-private works-header">私</span>
              </span>
              事<rt className="font-light">しごと</rt>
            </ruby>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tighter leading-tight mb-3 lg:mb-6 md:text-left">
            {title}
          </h1>
        </div>
        {tags && (
          <div className="lg:text-right text-nowrap mb-4 lg:mb-0">
            {tags.map((tag) => (
              <span className="inline-block rounded bg-slate-300 p-1 px-2 text-xs mr-1">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkHeader;
