import React, { useContext } from "react";
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import Coursecontent from "../../component/coursecontent";

export default function Home() {
  const { setcourse } = useContext(Coursecontent);
  const navigate = useNavigate();

  const handclick = (val) => {
    setcourse(val);
    navigate("/standard");
  };

  const handclicktwo = (val) => {
    setcourse(val);
    navigate("/download", { state: { course: val, classval: null } });
  };

  return (
    <div className="overallhome">
      <div className="homehanding">
        <h1>Select Your Category</h1>
      </div>

      <div className="homecontent">
        {/* CBSE */}
        <div className="homebox homebox1">
          <div className="homeboxtitle">
            <span>
              <FaBookReader />
            </span>
            <h1>CBSE</h1>
          </div>
          <p>For Classes 6th to 12th</p>
          <button onClick={() => handclick("CBSE")}>Select</button>
        </div>

        {/* ICSE */}
        <div className="homebox homebox2">
          <div className="homeboxtitle">
            <span>
              <FaBookReader />
            </span>
            <h1>ICSE</h1>
          </div>
          <p>For Classes 6th to 12th</p>
          <button onClick={() => handclick("ICSE")}>Select</button>
        </div>

        {/* JEE Main */}
        <div className="homebox homebox3">
          <div className="homeboxtitle">
            <span>
              <FaBookReader />
            </span>
            <h1>JEE Mains</h1>
          </div>
          <p>Engineering Entrance Exam</p>
          <button onClick={() => handclicktwo("JEE Main")}>Select</button>
        </div>

        {/* NEET */}
        <div className="homebox homebox4">
          <div className="homeboxtitle">
            <span>
              <FaBookReader />
            </span>
            <h1>NEET</h1>
          </div>
          <p>Medical Entrance Exam</p>
          <button onClick={() => handclicktwo("NEET")}>Select</button>
        </div>
      </div>
    </div>
  );
}
