import React from 'react';
import '../styles/Buynow.css';

const Buynow = () => {
    return (
        <div className='buy-main'>

            <div className="buy-container">
                <div className="payment-section">
                    <h2>
                        <center>Checkout</center>
                    </h2>
                    <div className="payment-form">
                        <form id="paymentForm">
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 1234 1234 1234" required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="expiryDate">Expiry Date</label>
                                    <input type="text" id="expiryDate" name="expiryDate" placeholder="MM / YY" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cvv">CVV</label>
                                    <input type="text" id="cvv" name="cvv" placeholder="123" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nameOnCard">Name on Card</label>
                                <input type="text" id="nameOnCard" name="nameOnCard" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="billingAddress">Billing Address</label>
                                <input type="text" id="billingAddress" name="billingAddress" placeholder="123 Main St, City, Country" required />
                            </div>
                            <div className="order-summary">
                                <div className="sl">
                                    <h3>Order Summary</h3>
                                    <p>Product: <span id="productName"><b>Sample Product</b></span></p>
                                    <p>Price: <span id="productPrice"><b>₹1000.00</b></span></p>
                                    <p>Shipping: <span id="shippingCost"><b>₹40.00</b></span></p>
                                    <p>Total: <span id="totalCost"><b>₹1040.00</b></span></p>
                                </div>
                                <div className="sr">
                                    <img id="pimg" src="../assets/imgs/default.png" alt="Product" />
                                </div>
                            </div>
                            <button type="submit" className="buy-button">Place Order</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Buynow;
