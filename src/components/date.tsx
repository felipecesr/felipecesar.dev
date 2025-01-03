import formatDate, { toISODate } from "@/lib/format-date";

const Date = ({ date }) => (
  <time
    dateTime={toISODate(date)}
    className="text-primary-600 dark:text-primary-400"
  >
    {formatDate(date)}
  </time>
);

export default Date;
