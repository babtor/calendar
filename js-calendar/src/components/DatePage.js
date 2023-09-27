import React from "react";
import { useParams } from "react-router-dom";

function BlankDate() {
  const { dateId } = useParams();

  return (
    <div>
      <h2>Blank Date Page</h2>
      <p>Date: {dateId}</p>
      {/* Add your content for the blank version of the date here */}
    </div>
  );
}

export default BlankDate;
