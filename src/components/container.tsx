type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container max-w-(--breakpoint-lg) mx-auto mt-[48px] mb-10 lg:my-16 px-4">{children}</div>;
};

export default Container;
