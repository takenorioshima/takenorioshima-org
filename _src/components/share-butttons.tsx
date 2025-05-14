import Link from "next/link";

type Props = {
  title: string;
  slug: string;
};

const socialButtons = (props: Props) => {
  const url = process.env.NEXT_PUBLIC_SITE_URL + "/posts/" + props.slug;
  const twitterSharerUrl = "https://twitter.com/intent/tweet?text=" + encodeURI(props.title) + "&url=" + url;
  const facebookSharerUrl = "https://www.facebook.com/sharer.php?u=" + url;

  return (
    <div className="mt-10 border-t border-slate-300 pt-10">
      <div className="flex text-sm flex-wrap justify-center md:justify-between">
        <div className="flex items-center">
          <Link
            className="rounded-full w-full whitespace-nowrap bg-white p-3 mr-2 px-5 shadow-sm transition hover:opacity-70"
            href={twitterSharerUrl}
          >
            <i className="bi bi-twitter-x"></i> ポストする
          </Link>
          <Link
            className="rounded-full w-full whitespace-nowrap bg-white p-3 px-5 shadow-sm transition hover:opacity-70"
            href={facebookSharerUrl}
          >
            <i className="bi bi-facebook"></i> シェアする
          </Link>
        </div>
        <Link
          className="p-4 sm:p-3 text-slate-700 transition hover:opacity-70"
          href="https://github.com/takenorioshima/takenorioshima-org/issues"
          target="_blank"
        >
          <i className="bi bi-flag-fill"></i> 記事の問題を報告
        </Link>
      </div>
    </div>
  );
};

export default socialButtons;
