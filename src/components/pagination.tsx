import Link from "next/link";

type Props = {
  pages: number[];
  currentPage: number;
};

function activePage(page: number, currentPage: number) {
  if (page !== currentPage) {
    return false;
  }
  return true;
}

function klassName(page: number, currentPage: number) {
  const classes = "p-3";
  if (page !== currentPage) {
    return classes;
  } else {
    return classes + " bg-black text-white font-semibold rounded";
  }
}

export default function Pagination({ pages, currentPage }: Props) {
  console.log(pages);
  console.log(currentPage);
  return (
    <>
      <ul className="flex items-center justify-center my-10">
        {pages.map((page: number) => (
          <li key={page}>
            <Link href={`/posts/page/${page}`} className={klassName(page, currentPage)}>
              <span>{page}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
