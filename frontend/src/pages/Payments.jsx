import "./Payments.css";
import { useNavigate } from "react-router-dom";

function Payments() {
    const navigate = useNavigate();

    const handleCCClick = () => {
        navigate("/");
        alert("Booking confirmed!");
    }

    return (
        <div className="payment-div">
            <p>Select the method to pay</p>
            <button id="upi">STRIPE</button>
            <button onClick={handleCCClick} id="CC">CC</button>
        </div>
    );
}

export default Payments;