import Image from "next-export-optimize-images/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { PrevButton, NextButton, usePrevNextButtons } from "./carousel-buttons";

type Props = {
  slug: string;
  images: string[];
};

export default function WorkViewer({ slug, images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  const hasMultipleImage = images.length > 1 ? true : false;

  return (
    <section className="p-10" data-aos="fade-in">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
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
