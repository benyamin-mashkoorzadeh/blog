import {formatDistanceToNow, parseISO} from "date-fns-jalali";

const ShowTime = ({timestamp}) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const time = formatDistanceToNow(date)
        timeAgo = `${time} قبل`
    }
  return (
      <span>
          <i>{timeAgo}</i> &nbsp;
      </span>
  )
}

export default ShowTime;
