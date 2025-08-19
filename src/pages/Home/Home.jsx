import React, { createContext, useContext, useState } from "react";
import '../Home/Home.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBookReader } from 'react-icons/fa';
import Coursecontent from "../../component/coursecontent";


export default function Home() {
    const {setcourse}=useContext(Coursecontent);
    const navigate = useNavigate();
    const handclick = (val) => {
        setcourse(val);
        
        navigate("/standard");
    };

    const handclicktwo=(val)=>{
        setcourse(val);
        navigate('/download');
    }
    return (
       
            <div className="overallhome">
                <div className="homehanding">
                    <h1>Select Your Category</h1>
                </div>
                <div className="homecontent">
                    <div className="homebox homebox1">
                        <div className="homeboxtitle">
                            <span><FaBookReader /> </span>
                         
                            <a>CBSE</a>

                        </div>
                        <p>For Classes 6th to 12th</p>
                        <button onClick={() => handclick("CBSE")}>Select</button>
                    </div>
                    <div className="homebox homebox2">
                        <div className="homeboxtitle">
                            <span><FaBookReader /> </span>
                            <a>ICSE</a>

                        </div>
                        <p>For Classes 6th to 12th</p>
                        <button onClick={()=>handclick("ICSE")}>Select</button>
                    </div>
                    <div className="homebox homebox3">
                        <div className="homeboxtitle">
                            <span><FaBookReader /> </span>
                            <a>JEE Mains</a>

                        </div>
                        <p>Engineering Entrance Exam</p>
                        <button onClick={()=>handclicktwo("JEE Main")}>Select</button>
                    </div>
                    <div className="homebox homebox4">
                        <div className="homeboxtitle">
                            <span><FaBookReader /> </span>
                            <a>NEET</a>

                        </div>
                        <p>Medical Entrance Exam</p>
                        <button onClick={()=>handclicktwo("NEET")}>Select</button>
                    </div>
                </div>
            </div>
        
    );
}