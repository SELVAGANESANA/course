import React from "react";
import '../Payment/payment.css'

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

        await fetch("YOUR_GOOGLE_SCRIPT_URL_HERE", {
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
            <div className="contentus">

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
                        placeholder="Course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Save</button>
                </form>

            </div>
        </div>
    )
}

