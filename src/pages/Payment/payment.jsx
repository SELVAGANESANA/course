import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../Payment/payment.css';
import { MdEmail } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import razorpay from '../../assets/razorlog.png';
import Coursecontent from "../../component/coursecontent";
import PaymentSuccessPage from "./PaymentSuccessPage";
export default function Paymentpage() {
    const { classstand, setclassstand, course } = useContext(Coursecontent);
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        course: "",
        classstand: ""
    });

    // Update classstand if course is NEET
    useEffect(() => {
        if (course === "NEET") setclassstand("[UG]");
    }, [course, setclassstand]);

    // Update form data when course/classstand changes
    useEffect(() => {
        if (course) {
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
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
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
            const orderRes = await fetch("https://appsail-50030453917.development.catalystappsail.in/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 49900 }) // Rs. 499 in paise
            });
            const orderData = await orderRes.json();
            if (!orderData.success) {
                alert("Error creating order. Please try again.");
                return;
            }

            // Step 2: Razorpay payment options
            const options = {
                key: "rzp_live_R74L1zZacpVob2",
                amount: orderData.order.amount,
                currency: "INR",
                name: "Mock Test Ninja",
                description: formData.course,
                order_id: orderData.order.id,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: { color: "#3399cc" },
                handler: async function (response) {
                    // Close modal immediately
                    if (window.Razorpay) window.Razorpay.close();

                    setIsLoading(true);

                    try {
                        // Step 3: Send data to backend for verification & email
                        const paymentRes = await fetch("https://appsail-50030453917.development.catalystappsail.in/payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ ...formData, ...response })
                        });
                        const paymentData = await paymentRes.json();
                        setIsLoading(false);

                        if (paymentData.success) {
                            // Redirect using react-router
                            navigate(`/payment-success-page?link=${encodeURIComponent(paymentData.receiptUrl)}`);

                        } else {
                            alert("Payment verification failed. Please contact support.");
                        }
                    } catch (err) {
                        console.error("Payment verification error:", err);
                        setIsLoading(false);
                        alert("Something went wrong. Please try again.");
                    }
                }
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
                <h3>Kindly <b>pay Rs. 499/-</b> to download the notes and papers.</h3>
                <h3>Important: After payment, you will receive the notes and papers instantly in your email inbox.</h3>
                <b>Please ensure your provided email ID is correct</b>

                <div className="contentdetails">
                    <h4>Contact us</h4>
                    <ul>
                        <li><MdEmail /> &nbsp; geniusmind.co99@gmail.com</li>
                    </ul>
                    <h4>Terms & Conditions:</h4>
                    <p>You agree to share information entered on this page with Mock Test Ninja (owner of this page) and Razorpay, adhering to applicable laws.</p>
                    <div className="razor">
                        <img src={razorpay} alt="Razorpay" />
                        <b> Razorpay</b>
                    </div>
                </div>
            </div>

            <div className="contentus">
                <h1>BUY</h1>
                <form onSubmit={handleSubmit}>
                    <input name="course" value={formData.course} readOnly />
                    <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                    <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
                    <input name="courseprice" value="Rs. 499" readOnly />
                    <button type="submit">Pay Now</button>
                </form>
            </div>
        </div>
    );
}