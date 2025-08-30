import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Payment/payment.css";
import { MdEmail } from "react-icons/md";
import razorpay from "../../assets/razorlog.png";
import Coursecontent from "../../component/coursecontent";

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

  // Auto-update classstand for NEET
  useEffect(() => {
    if (course === "NEET") {
      setclassstand("[UG]");
    }
  }, [course, setclassstand]);

  // Sync course/classstand into formData
  useEffect(() => {
    if (course) {
      setFormData((prev) => ({
        ...prev,
        course,
        classstand: classstand || ""
      }));
    }
  }, [course, classstand]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create order on backend
      const orderRes = await fetch(
        "https://coursebackend-2tdc.onrender.com/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 499, // Razorpay needs paise → 499 * 100
            ...formData
          }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderData.success) {
        setIsLoading(false);
        alert("Error creating order. Please try again.");
        return;
      }

      // 2. Open Razorpay checkout popup
      const options = {
        key: "rzp_live_R8cBXdDwlWWQAX", // replace with your live key
        amount: orderData.order.amount,
        currency: "INR",
        name: "Genius Minds",
        description: formData.course,
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // Send response to backend for verification
            const verifyRes = await fetch("https://coursebackend-2tdc.onrender.com/payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formData,
                ...response,
              }),
            });

            const verifyData = await verifyRes.json();
            setIsLoading(false);

            if (verifyData.success) {
              // ✅ Navigate to success page with download link
              navigate(`/payment-success?link=${encodeURIComponent(verifyData.receiptUrl)}`);
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error verifying payment.");
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
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
        <h2>
          {course} {classstand} - Revision Notes and Papers
        </h2>
        <h3>
          Kindly <b>pay Rs. 499/-</b> to download the notes and papers.
        </h3>
        <h3>
          Important: After payment, you will receive the notes and papers
          instantly in your email inbox.
        </h3>
        <b>Please ensure your provided email ID is correct</b>

        <div className="contentdetails">
          <h4>Contact us</h4>
          <ul>
            <li>
              <MdEmail /> &nbsp; geniusmind.co99@gmail.com
            </li>
          </ul>
          <h4>Terms & Conditions:</h4>
          <p>
            You agree to share information entered on this page with
            Genius Minds (owner of this page) and Razorpay, adhering to applicable
            laws.
          </p>
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
          <input name="courseprice" value="Rs. 499" readOnly />
          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
}
