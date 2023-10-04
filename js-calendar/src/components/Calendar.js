import React, { useState } from "react";
import {
  format,
  eachDayOfInterval,
  parse,
  endOfMonth,
  addMonths,
  subMonths,
  getDay,
  setDay,
  startOfWeek,
} from "date-fns";
import { Link } from "react-router-dom";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize current date to today
  const locale = require("date-fns/locale/en-US"); // Force to use en-US locale, otherwise dates become bugged.
  const firstDayOfMonth = parse(
    format(currentDate, "yyyy-MM-01"),
    "yyyy-MM-dd",
    new Date()
  );
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth, { locale });
  const correctedFirstDayOfMonth = setDay(firstDayOfWeek, 0, { locale });
  // Create an array of dates for the current month
  const datesInMonth = eachDayOfInterval({
    start: correctedFirstDayOfMonth,
    end: lastDayOfMonth,
  });

  // For skipping forwards or backwards in months
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={goToPreviousMonth}>Previous Month</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={goToNextMonth}>Next Month</button>
      </div>
      <table className="days">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {createCalendarGrid(datesInMonth).map((week, index) => (
            <tr key={index}>
              {week.map((date) => (
                <td>
                  <Link to={`/date/${format(date, "yyyy-MM-dd")}`}>
                    {format(date, "d")}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function createCalendarGrid(datesInMonth) {
  const calendarGrid = [];
  let currentWeek = [];

  datesInMonth.forEach((date) => {
    currentWeek.push(date);

    if (getDay(date) === 6) {
      calendarGrid.push([...currentWeek]);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    calendarGrid.push([...currentWeek]);
  }

  return calendarGrid;
}

export default Calendar;
