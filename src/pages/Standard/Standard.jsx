import React, { useContext } from "react";
import '../Standard/Standard.css';
import Coursecontent from "../../component/coursecontent";
import { useNavigate } from "react-router-dom";

export default function Standard() {
    const navigate = useNavigate();
    const { course, setclassstand } = useContext(Coursecontent);

    const class_button = Array.from({ length: 7 }, (_, i) => i + 6); // 6 to 12

    const changestandard = (classval) => {
        setclassstand(`Class ${classval}`);
        navigate("/download", { state: { course, classval } }); 
    };

    return (
        <div className="overallclass">
            <h1>{course}</h1>
            <h1>{course} – Important Notes & Practise Papers</h1>
            <h2>(Based On Latest {course} Syllabus for Session 2025-26)</h2>
            <h3>Select Your Class</h3>
            <ul>
                {class_button.map(val => (
                    <button
                        key={val}
                        onClick={() => changestandard(val)}
                        disabled={course === "ICSE" && val === 11}
                        style={{
                            opacity: course === "ICSE" && val === 11 ? 0.5 : 1,
                            cursor: course === "ICSE" && val === 11 ? "not-allowed" : "pointer"
                        }}
                    >
                        Class {val}
                    </button>
                ))}
            </ul>
        </div>
    );
}