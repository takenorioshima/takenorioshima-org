type Props = {
  children?: React.ReactNode;
  isSinglePost?: boolean;
};

const Container = ({ children, isSinglePost }: Props) => {
  const maxWidth = isSinglePost ? "max-w-(--breakpoint-lg)" : "max-w-(--breakpoint-xl)";
  return <div className={`container ${maxWidth} mx-auto mt-[48px] mb-10 lg:my-16 px-4`}>{children}</div>;
};

export default Container;
