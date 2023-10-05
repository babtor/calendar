import { useState } from "react";
import { useEffect } from "react";
import getDay from "date-fns/getDay";

// Local storage function
export function useLocalStorage(key, initialValue) {
  const [data, setData] = useState(() => {
    const storedValue = localStorage.getItem(key);
    // Return as parsed if stored data is found
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Keeps localstorage synced to changes in state, if null or empty string, remove from storage
  useEffect(() => {
    if (data === null || data === "") {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [key, data]);
  return [data, setData];
}
// Creates grid layout for dates
export function createCalendarGrid(datesInMonth) {
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
