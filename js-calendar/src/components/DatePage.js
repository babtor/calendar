import React from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../utils/functions";
// Local storage hook

function DatePage() {
  const { dateId } = useParams();
  const [reminder, setReminder] = useLocalStorage(`Reminder-${dateId}`, "");
  const [time, setTime] = useLocalStorage(`Time-${dateId}`, "");
  return (
    <>
      <div>
        <h2>Set your reminders here</h2>
        <p>Date: {dateId}</p>
        <p>
          {time}:{reminder}
        </p>
      </div>
      <form>
        <input
          type="text"
          value={reminder}
          placeholder="What do you need to remember?"
          onChange={(e) => setReminder(e.target.value)}
        />
        <input type="submit" value="Submit"></input>
        <br></br>
        <input
          type="text"
          value={time}
          placeholder="At what time?"
          onChange={(e) => setTime(e.target.value)}></input>
      </form>
    </>
  );
}

export default DatePage;
