export type LenisScrollEvent = {
  animatedScroll: number;
  actualScroll: number;
  direction: 0 | 1 | -1;
  velocity: number;
  progress: number;
  dimensions: {
    scrollHeight: number;
    scrollWidth: number;
    height: number;
    width: number;
  };
};
