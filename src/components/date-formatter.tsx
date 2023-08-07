import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  modifiedDateString?: string;
  className?: string;
};

const DateFormatter = ({ dateString, modifiedDateString, className }: Props) => {
  const date = parseISO(dateString);
  const modifiedDate = (() => {
    if (!modifiedDateString) {
      return "";
    }
    return parseISO(modifiedDateString);
  })();
  return (
    <>
      <div className={className}>
        <i className="bi bi-clock"></i>
        &nbsp;
        <time dateTime={dateString}>{format(date, "MMM d, yyyy")}</time>
        {modifiedDate && (
          <>
            <i className="bi bi-arrow-clockwise ml-4"></i>
            &nbsp;
            <time dateTime={modifiedDateString}>{format(modifiedDate, "MMM d, yyyy")}</time>
          </>
        )}
      </div>
    </>
  );
};

export default DateFormatter;
