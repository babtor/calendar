import React, { useState } from "react";
import {
  format,
  eachDayOfInterval,
  parse,
  endOfMonth,
  addMonths,
  subMonths,
  setDay,
  startOfWeek,
} from "date-fns";
import { Link } from "react-router-dom";
import { calendarGrid } from "../utils/functions";

//TODO: Have reminders saved as list rather than inputs?

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize current date to today
  const locale = require("date-fns/locale/en-US"); // Force to use en-US locale, otherwise dates become bugged.
  const firstDayOfMonth = parse(
    // Calculates amount of days in the month
    format(currentDate, "yyyy-MM-01"),
    "yyyy-MM-dd",
    new Date()
  );
  const lastDayOfMonth = endOfMonth(firstDayOfMonth, { locale });
  const firstDayOfWeek = startOfWeek(firstDayOfMonth, { locale });
  const gridFirstDayOfMonth = setDay(firstDayOfWeek, 0, { locale });
  // Create an array of dates for the current month
  const datesInMonth = eachDayOfInterval({
    start: gridFirstDayOfMonth,
    end: lastDayOfMonth,
  });
  // For skipping forwards or backwards in months
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  // return localstorage based on date-format
  const getReminderData = (date) => {
    return localStorage.getItem(`Reminder-${format(date, "yyyy-MM-dd")}`);
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
          {calendarGrid(datesInMonth).map((week, index) => (
            <tr key={index}>
              {week.map((date) => (
                <td>
                  {/* Map out values to specific dates and link to new pages */}
                  <Link to={`/date/${format(date, "yyyy-MM-dd")}`}>
                    {format(date, "d")}
                    <p>{getReminderData(date)}</p>
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
export default Calendar;
