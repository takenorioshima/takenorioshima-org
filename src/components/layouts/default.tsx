import Header from "../header";
import Footer from "../footer";
import Meta from "../meta";
import { useRouter } from "next/router";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  const router = useRouter();
  const klass = router.asPath.includes("/works") ? "bg-graph" : "";

  return (
    <>
      <Meta />
      <Header />
      <div className={`min-h-screen ${klass}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
