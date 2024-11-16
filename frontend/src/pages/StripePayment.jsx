import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StripePayment.css"; // Add styles for the modal here

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx"); // Test Publishable Key

const CheckoutForm = ({ closeModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        try {
            const response = await fetch("http://localhost:3000/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 1000 }), // Example amount in cents ($10.00)
            });

            const { clientSecret } = await response.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                setMessage(error.message);
            } else if (paymentIntent) {
                setMessage("Payment successful!");
                setTimeout(() => closeModal(), 2000); // Close modal after success
                alert("Success!");
                navigate("/");
            }
        } catch (err) {
            setMessage("Failed to process payment. Please try again.");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
            {message && <p className="message">{message}</p>}
        </form>
    );
};

const StripePayment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={openModal} className="open-modal-button">
                Open Payment Form
            </button>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="close-modal-button">
                            &times;
                        </button>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm closeModal={closeModal} />
                        </Elements>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StripePayment;
