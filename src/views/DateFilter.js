import React from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import {
  getThisMonthFilter,
  getLastMonthFilter,
  formatDateTimeRange
} from "./utils/helper";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";

const DateFilter = props => {
  const { start, end, applyCallback } = props;

  let now = new Date();
  let tempstart = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  );
  let tempend = moment(tempstart)
    .add(1, "days")
    .subtract(1, "seconds");

  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  firstDay = moment(firstDay);
  lastDay = moment(lastDay);
  let thisMonth = getThisMonthFilter();
  let lastMonth = getLastMonthFilter();
  let ranges = {
    "Last 24 Hours": [moment().subtract(24, "h"), moment()],
    "Today Only": [moment(tempstart), moment(tempend)],
    "Yesterday Only": [
      moment(tempstart).subtract(1, "days"),
      moment(tempend).subtract(1, "days")
    ],
    "Last 3 Days": [moment(tempstart).subtract(3, "days"), moment(tempend)],
    "Last 7 Days": [moment(tempstart).subtract(7, "days"), moment(tempend)],
    "Last 30 Days": [moment(tempstart).subtract(30, "days"), moment(tempend)],
    "This Month": [
      moment(thisMonth[0]),
      moment()
        .hours(23)
        .minutes(59)
    ],
    "Last Month": [moment(lastMonth[0]), moment(lastMonth[1])]
  };
  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false
  };
  return (
    <DateTimeRangeContainer
      ranges={ranges}
      start={start}
      end={end}
      local={local}
      //maxDate={maxDate}
      applyCallback={applyCallback}
    >
      <Button
        round
        className="btstsy"
        style={{
          marginLeft: "10px",
          marginBottom: "15px",
          backgroundColor: "black",
          color: "white"
        }}
      >
        Date Filter : {formatDateTimeRange(start, end)}
      </Button>
    </DateTimeRangeContainer>
  );
};

export default DateFilter;
