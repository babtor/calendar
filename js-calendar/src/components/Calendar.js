import React, { useState } from "react";
import {
  format,
  eachDayOfInterval,
  parse,
  endOfMonth,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";
import { Link } from "react-router-dom";

function Calendar() {
  // Initialize current date to today
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = parse(
    format(currentDate, "yyyy-MM-01"),
    "yyyy-MM-dd",
    new Date()
  );

  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  const datesInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

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
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {createCalendarGrid(datesInMonth).map((week, index) => (
            <tr key={index}>
              {week.map((date) => (
                <td key={format(date, "yyyy-MM-dd")}>
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
