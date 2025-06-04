import React from 'react';
import '../styles/Privacy.css';
import { User } from '../utils/user';

const Privacy = () => {
    return (
        <div className='privacy-main'>
            <header>
                <h1 className='privacy-h1'>Privacy Policy</h1>
                <h2>{User.shop}</h2>
            </header>

            <div className="container">
                <div className="last-updated">Last Updated: {User.lastupdate}</div>

                <div className="section">
                    <h2 className='h2'>1. Introduction</h2>
                    <p>Welcome to {User.shop} ("we," "our," or "us"). We respect your privacy and are committed to protecting your
                        personal data. This privacy policy explains how we collect, use, and safeguard your information when you
                        use our Website.</p>
                </div>

                <div className="section">
                    <h2 className='h2'>2. Information We Collect</h2>
                    <p>We collect information that you provide directly to us, including:</p>
                    <ul>
                        <li>Name and contact information</li>
                        <li>Billing and shipping addresses</li>
                        <li>Payment information</li>
                        <li>Purchase history</li>
                    </ul>
                </div>

                <div className="section">
                    <h2 className='h2'>3. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul>
                        <li>Process your orders and payments</li>
                        <li>Communicate with you about your orders</li>
                        <li>Send you marketing communications (with your consent)</li>
                        <li>Improve our services</li>
                        <li>Prevent fraud</li>
                    </ul>
                </div>

                <div className="section">
                    <h2 className='h2'>4. Data Security</h2>
                    <p>We implement appropriate security measures to protect your personal information. This includes
                        encryption, secure servers, and regular security assessments.</p>

                    <div className="highlight">
                        <p>Your payment information is processed through secure payment processors and is never stored on our
                            servers.</p>
                    </div>
                </div>

                <div className="section">
                    <h2 className='h2'>5. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Withdraw consent for marketing</li>
                        <li>Export your data</li>
                    </ul>
                </div>

                <footer>
                    <p>For questions about this Privacy Policy, please contact:</p>
                    <p>{User.name}<br />
                        {User.shop}<br />
                        Email: {User.mail}
                    </p>
                </footer>
            </div>
            <div id="footer-placeholder"></div>
        </div>
    );
};

export default Privacy;
