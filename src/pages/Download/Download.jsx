import React, { useContext, useEffect } from "react";
import '../Download/Download.css'
import { useNavigate } from "react-router-dom";
import Coursecontent from "../../component/coursecontent";

export default function Download() {
    const navigate = useNavigate();
    const {classstand,setclassstand } = useContext(Coursecontent);
    const { course } = useContext(Coursecontent);
    

    useEffect(()=>{
        if(course==="NEET" || course==="JEE Main"){
        setclassstand(" ");
       
    }
    },[course.setclassstand]);

    const nextpage=()=>{
        navigate("/paymentpage");
    }
   
    return (
        <div className="overallsave">

            <div className="savetitle">
                <h1>{course} {classstand} – Important Notes & Questions</h1>
            </div>

            {/* Box */}

            <div className="savebox">
                <div className="saveboxcontent">
                    <h1>{course}  {classstand} </h1>
                    <h3>Short Revision Notes</h3>
                    <h2>+</h2>
                    <h3>Self Practice Papers</h3>
                    <h2>+</h2>
                    <h3>Most Asked Exam Questions</h3>
                    <a href="#downpay">Download Now</a>
                </div>
            </div>

            {/* Content  */}

            <div className="savecontent">
                <p>We have prepared a <b>complete study package for {course}  {classstand} Aspirants</b> , that will help them in <b> revising and retaining important topics </b>and formulas that are relevant for the board exams.</p>
                <h2>Package Includes:</h2>
                <ul>
                    <li> <b> Chapter Wise & Marking Scheme Wise: </b> Important questions and their solutions</li>
                    <li> <b>Summarised View: </b>  of each chapter on just <b> 1 page for quick revision</b> before the exam</li>
                    <li> <b>Graphical Mind-Maps </b>  to retain each chapter in student’s mind</li>
                    <li> <b>Practise Papers [On {course} Exam Pattern] </b>  to solve yourself and see how much you understand. After solving, compare it with our given solutions to cover the gap</li>
                    <li><b> Most Asked Exam Questions [Fully Solved]</b> of each subject</li>
                </ul>
                <h3>Everything in Downloadable PDF Format so that you can revise anytime.</h3>
                <h2>Subjects Included:</h2>
                <p>The revision pack consisits of all major subjects like <b> Maths, Science, Social Science, English, Hindi, Sanskrit, IT etc.</b></p>
                <h3>We can say it with conviction that you will be able to score 90% above, after preparing from our notes.</h3>
                <div className="savepayment">
                   <div className="savepayment_content">
                     <h1>Rs. <del>1999</del> 499</h1>
                    <h2>(75% Discount Applied)</h2>
                    <button id="downpay" onClick={()=>{nextpage()}} >Download</button>
                    <h4>You Will Get The Download Link Instantly On Your Email</h4>
                   </div>
                </div>
            </div>

        </div>
    )
}