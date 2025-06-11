type Work = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  images: string[];
  cover?: string;
  youTubeId?: string;
  appleMusic?: string;
  excerpt?: string;
  carouselDisabled?: boolean;
};

export default Work;
