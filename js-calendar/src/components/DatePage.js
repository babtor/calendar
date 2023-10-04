import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Local storage hook
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function DatePage() {
  const { dateId } = useParams();
  const [alarm, setAlarm] = useLocalStorage(`Alarm-${dateId}`, "");

  return (
    <>
      <div>
        <h2>Blank Date Page</h2>
        <p>Date: {dateId}</p>
        <p>{alarm}</p>
      </div>
      <form>
        <input value={alarm} onChange={(e) => setAlarm(e.target.value)} />
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
}

export default DatePage;
