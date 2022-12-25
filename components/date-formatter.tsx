import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  className: string;
};

const DateFormatter = ({ dateString, className }: Props) => {
  const date = parseISO(dateString);
};

export default DateFormatter;
