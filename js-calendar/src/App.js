import "./App.css";
import Calendar from "./components/Calendar";
import DatePage from "./components/DatePage";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/date/:dateId" element={<DatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

<div className="App">
  <Calendar />
</div>;

export default App;
