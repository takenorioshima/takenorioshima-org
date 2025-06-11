import Image from "next-export-optimize-images/image";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton, usePrevNextButtons } from "./carousel-buttons";
import { useEffect } from "react";

type Props = {
  slug: string;
  images: string[];
  youTubeId?: string;
  carouselDisabled?: boolean;
};

export default function WorkViewer({ slug, images, youTubeId, carouselDisabled }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const hasMultipleImage = images.length > 1 ? true : false;

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi, slug]);

  return (
    <section className="p-10">
      <div className="embla pacity-0" data-aos="fade-in" ref={emblaRef}>
        <div className="embla__container">
          {youTubeId && (
            <div className="embla__slide">
              <iframe
                className="rounded-lg"
                width={560}
                height={315}
                src={`https://www.youtube.com/embed/${youTubeId}`}
                allowFullScreen
              />
            </div>
          )}
          {!carouselDisabled &&
            images.map((image) => (
              <div className="embla__slide relative" key={image}>
                <Image
                  src={"/assets/works/" + slug + "/" + image}
                  alt={`Cover Image for ${slug}`}
                  className={"relative! w-full object-contain object-center"}
                  fill
                />
              </div>
            ))}
        </div>
        {hasMultipleImage && (
          <div className="embla__controls">
            <div className="embla__buttons">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
