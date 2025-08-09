import React from "react";
import { useState } from "react";
import '../Payment/payment.css'

import razorpay from '../../assets/razorlog.png';

export default function Paymentpage() {

         const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        course: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("https://script.google.com/macros/s/AKfycbyVdbH9pWljRio6CKhL5i9NV7cz7yiLWpmCm2HMY1VduxFL9Wz0ro9CrzvpbvSkpMYwug/exec", {
            method: "POST",
            mode: "no-cors", // Required for Google Script
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        alert("Data saved to Google Sheet!");
        setFormData({ name: "", phone: "", email: "", course: "" });
    };
 

  

    return (
        <div className="overallpayment">
            <div className="paymentcontent">
                <h2>NEET [UG] - Revision Notes and Papers</h2>
                <h3>Kindly <b>pay Rs. 499/-</b> to download the notes and papers.</h3>
                <h3>Important: After payment, you will receive the notes and papers instantly in your email inbox.</h3>
                <b>Please ensure your provided email ID is correct</b>
                <div className="contentdetails">
                    <h4> Contant us</h4>
                    <ul>
                        <li>geniusmind.co99@gmail.com</li>
                        <li>123456789</li>
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
                <h1>Pay</h1>
                <form onSubmit={handleSubmit}>
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
                        name="course"
                        value="Rs. 499"
                        disabled
                    />

                    <button type="submit">Save</button>
                </form>

            </div>
        </div>
    );
}

