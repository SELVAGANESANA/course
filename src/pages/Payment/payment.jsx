import React from "react";

import { useState, useEffect, useContext } from "react";

import '../Payment/payment.css';
import { MdEmail } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import '../Payment/payment.css'
import { useLocation } from "react-router-dom";

import razorpay from '../../assets/razorlog.png';
import Coursecontent, { Classstand } from "../../component/coursecontent";

export default function Paymentpage() {


    const { classstand, setclassstand, course } = useContext(Coursecontent);

    const location = useLocation();
    const { course: locationCourse, classstand: locationClassstand } = location.state || {};


  useEffect(() => {
  if (course === "NEET") {
    setclassstand("[UG]");
  }
}, [course, setclassstand]);





    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        course: "",
        classstand: ""
    });

    useEffect(() => {
        if (course) { // remove classstand check
            setFormData(prev => ({
                ...prev,
                course,
                classstand: classstand || ""
            }));
        }
    }, [course, classstand]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await loadRazorpay();
        if (!res) {
            alert("Razorpay SDK failed to load. Check your internet connection.");
            return;
        }

        try {
            // Step 1: Create Razorpay order
            const orderRes = await fetch("https://appsail-50030453917.development.catalystappsail.in/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 10 })
            });
            const orderData = await orderRes.json();

            if (!orderData.success) {
                alert("Error creating order. Please try again.");
                return;
            }

            // Step 2: Razorpay payment options
            const options = {
                key: "rzp_live_R74L1zZacpVob2", // From .env in React
                amount: orderData.order.amount,
                currency: "INR",
                name: "Mock Test Ninja",
                description: formData.course,
                order_id: orderData.order.id,
                handler: async function (response) {
                    setIsLoading(true);
                    // Step 3: Send data to backend after payment success
                    const paymentRes = await fetch("https://appsail-50030453917.development.catalystappsail.in/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...formData,
                            ...response
                        })
                    });

                    const paymentData = await paymentRes.json();
                    setIsLoading(false);
                    if (paymentData.success) {
                        // Redirect to result page with receipt URL
                        window.location.href = `/payment-success-page?link=${encodeURIComponent(paymentData.receiptUrl)}`;
                    } else {
                        setIsLoading(false);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: { color: "#3399cc" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error("Error:", err);
            setIsLoading(false);
            alert("Something went wrong. Please try again.");
        }
    };





    return (
        <div className="overallpayment">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Processing your payment, please wait...</p>
                </div>
            )}
            <div className="paymentcontent">

                <h2>{course} {classstand} - Revision Notes and Papers</h2>

                <h2>{formData.course} - Revision Notes and Papers</h2>

                <h3>Kindly <b>pay Rs. 499/-</b> to download the notes and papers.</h3>
                <h3>Important: After payment, you will receive the notes and papers instantly in your email inbox.</h3>
                <b>Please ensure your provided email ID is correct</b>
                <div className="contentdetails">
                    <h4> Contant us</h4>
                    <ul>
                        <li><MdEmail /> &nbsp;  geniusmind.co99@gmail.com</li>
                        
                    </ul>
                    <h4>Terms & Conditions:</h4>
                    <p>You agree to share information entered on this page with Mock Test Ninja (owner of this page) and Razorpay, adhering to applicable laws.</p>
                    <div className="razor">
                        <img src={razorpay} alt="" />
                        <b> Razorpay</b>
                    </div>
                </div>
            </div>
            <div className="contentus">
                <h1>BUY</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        name="course"
                        value={formData.course}
                        readOnly
                    />
                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="courseprice"
                        value="Rs. 499"
                        readOnly
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

