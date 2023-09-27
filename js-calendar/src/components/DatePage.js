import React from "react";
import { useParams } from "react-router-dom";

function DatePage() {
  const { dateId } = useParams();

  return (
    <div>
      <h2>Blank Date Page</h2>
      <p>Date: {dateId}</p>
      {}
    </div>
  );
}

export default DatePage;
