import Link from "next/link";

type Props = {
  pages: number[];
  currentPage: number;
};

function klassName(page: number, currentPage: number) {
  const classes = "p-3";
  if (page !== currentPage) {
    return classes;
  } else {
    return classes + " bg-black text-white font-semibold rounded-sm";
  }
}

export default function Pagination({ pages, currentPage }: Props) {
  return (
    <ul className="flex items-center justify-center my-10">
      {pages.map((page: number) => (
        <li key={page}>
          <Link href={`/posts/page/${page}`} className={klassName(page, currentPage)}>
            <span>{page}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
