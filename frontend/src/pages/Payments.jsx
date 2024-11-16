import "./Payments.css";
import { useNavigate } from "react-router-dom";

function Payments() {
    const navigate = useNavigate();

    const handleCCClick = () => {
        navigate("/");
        alert("Booking confirmed!");
    }

    const handleStripeClick = () => {
        navigate("/stripepayment");
    }

    return (
        <div className="payment-div">
            <p>Select the method to pay</p>
            <button onClick={handleStripeClick} id="upi">STRIPE(CC)</button>
            <button onClick={handleCCClick} id="CC">UPI(MOCK)</button>
        </div>
    );
}

export default Payments;