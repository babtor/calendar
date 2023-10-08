import React from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../utils/functions";

//TODO: Handle submit data and map submits to UL in order to handle more than one reminder

function DatePage() {
  const { dateId } = useParams();
  const [reminder, setReminder] = useLocalStorage(`Reminder-${dateId}`, "");
  return (
    <div className="wrapperDiv">
      <div>
        <h2>Set your reminders here</h2>
        <p>Date: {dateId}</p>
        <p>{reminder}</p>
      </div>
      <form className="reminderForm">
        <input
          type="text"
          value={reminder}
          placeholder="Set your time and reminder, ex 16:45: Do laundry"
          onChange={(e) => setReminder(e.target.value)}
        />
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default DatePage;
