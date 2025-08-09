import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Standard from "./pages/Standard/Standard";
import Download from "./pages/Download/Download";
import Coursecontent from "./component/coursecontent";
import { Classstand } from "./component/coursecontent";
import Paymentpage from "./pages/Payment/payment";
import Footer from "./footer/footer";
import './App.css';



function App() {
    const [course, setcourse] = useState(() => {
        const storedCourse = localStorage.getItem("course");
        return storedCourse || "class";
    });
    const [classstand, setclassstand] = useState(() => {
        const storestand = localStorage.getItem("classstand");
        return storestand || '0';
    });


    useEffect(() => {
        localStorage.setItem("course", course);
    }, [course]);
    useEffect(() => {
        localStorage.setItem('classstand', classstand);
    }, [classstand]);
    return (
        <div className="overallapp">
        <Coursecontent.Provider value={{ course, setcourse, classstand, setclassstand }}>
            <BrowserRouter>
                <Routes>
              
                            <Route path="/" element={<Home />} />
                            <Route path="/standard" element={<Standard />} />
                            <Route path="/download" element={<Download />} />
                            <Route path="/imageslide" element={<Footer />} />
                            <Route path="/paymentpage" element={<Paymentpage/>} />
                   
                </Routes>
                <Footer/>
            </BrowserRouter>
        </Coursecontent.Provider>
        </div>
    )
}

export default App;