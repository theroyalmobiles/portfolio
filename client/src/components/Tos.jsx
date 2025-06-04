import React from 'react';
import '../styles/Tos.css';
import { User } from '../utils/user';

const Tos = () => {
    return (
        <div className='tos-main'>
            <header>
                <h1 className='tos-h1'>Terms of Service</h1>
                <h2>{User.shop}</h2>
            </header>

            <div className="container">
                <div className="last-updated">Last Updated: {User.lastupdate}</div>

                <div className="section">
                    <h2 className='h2'>1. Acceptance of Terms</h2>
                    <p>By accessing and using GoBuy, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.</p>
                </div>

                <div className="section">
                    <h2 className='h2'>2. Use License</h2>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on GoBuy for personal, non-commercial transitory viewing only.</p>

                    <div className="important-notice">
                        <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by GoBuy at any time.</p>
                    </div>
                </div>

                <div className="section">
                    <h2 className='h2'>3. Purchase & Payment Terms</h2>
                    <ul>
                        <li>All prices are in applicable currency and subject to change</li>
                        <li>Payment must be made in full at the time of purchase</li>
                        <li>We accept major credit cards and other specified payment methods</li>
                        <li>Taxes will be added where applicable</li>
                    </ul>
                </div>

                <div className="section">
                    <h2 className='h2'>4. Shipping & Returns</h2>
                    <p>Our shipping and returns policies include:</p>
                    <ul>
                        <li>Standard shipping within 3-5 working days</li>
                        <li>30-day return policy for most items</li>
                        <li>Items must be unused and in original packaging</li>
                    </ul>
                </div>

                <div className="section">
                    <h2 className='h2'>5. Account Responsibilities</h2>
                    <p>You are responsible for:</p>
                    <ul>
                        <li>Maintaining account confidentiality</li>
                        <li>All activities under your account</li>
                        <li>Updating your account information</li>
                        <li>Complying with all laws and regulations</li>
                    </ul>
                </div>

                <footer>
                    <p>For questions about these Terms of Service, please contact:</p>
                    <p>{User.name}<br />
                        {User.shop}<br />
                        Email: {User.mail}
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Tos;
