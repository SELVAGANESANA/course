import React from "react";
import { useLocation } from "react-router-dom";

export default function PaymentSuccessPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const downloadLink = params.get("link");

    return (
        <div style={{ textAlign: "center", padding: "40px", height: "100vh" }}>
            <h1>🎉 Payment Successful!</h1>
            <p>Thank you for your purchase. Your NEET UG Notes & Papers are ready.</p>

            {downloadLink && (
                <>
                    <h3>📥 Download Link</h3>
                    <a href={downloadLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: "18px", color: "blue" }}>
                        Click here to download
                    </a>
                </>
            )}

            <p style={{ marginTop: "20px" }}>
               A copy of the link has also been sent to your email. If you don’t receive it, kindly check your Spam or Junk folder.
            </p>
        </div>
    );
}
