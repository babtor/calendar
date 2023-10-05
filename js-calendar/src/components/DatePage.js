import React from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../utils/functions";
// Local storage hook

function DatePage() {
  const { dateId } = useParams();
  const [reminder, setReminder] = useLocalStorage(`Reminder-${dateId}`, "");
  return (
    <>
      <div>
        <h2>Blank Date Page</h2>
        <p>Date: {dateId}</p>
        <p>{reminder}</p>
      </div>
      <form>
        <input value={reminder} onChange={(e) => setReminder(e.target.value)} />
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
}

export default DatePage;
