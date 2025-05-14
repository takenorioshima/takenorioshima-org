import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-white text-4xl md:text-7xl lg:text-7xl font-semibold tracking-tighter leading-tight mb-12 md:text-left">
      {children}
    </h1>
  );
};

export default PostTitle;
