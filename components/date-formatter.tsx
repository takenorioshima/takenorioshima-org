import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  className: string;
};

const DateFormatter = ({ dateString, className }: Props) => {
  const date = parseISO(dateString);
  return (
    <>
      <div className={className}>
        <i className="bi bi-clock"></i>
        &nbsp;
        <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>
      </div>
    </>
  );
};

export default DateFormatter;
