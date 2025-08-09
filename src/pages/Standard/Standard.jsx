import React, { useContext, useState } from "react";
import '../Standard/Standard.css';
import Coursecontent, { Classstand } from "../../component/coursecontent";
import { useNavigate } from "react-router-dom";


export default function Standard(){
    const navigate=useNavigate();
   
    const {course}=useContext(Coursecontent);   // course name
    
    const {setclassstand}=useContext(Coursecontent);
    
    let class_button=[];
    for(let i=6; i<=12;i++){
        class_button.push(i);
        
    };
    
   
    const changestandard=(classval)=>{
        setclassstand("Class "+ classval);
        console.log(Classstand);
        navigate("/download");
        
    }
   
    return(
        <div className="overallclass">
            <h1> {course} </h1>
            <h1>{course} – Important Notes & Practise Papers</h1>
            <h2>(Based On Latest {course} Syllabus for Session 2025-26)</h2>
            <h3>Select Your Class</h3>
        <ul>
            {class_button.map(val=>(
                <button onClick={()=>changestandard(val)} key={val}>{val}</button>
            ))}
            
        </ul>
       
        </div>
    )
}