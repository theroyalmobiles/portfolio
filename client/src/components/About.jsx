import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../utils/user';

const About = () => {
    return (
        <div className="max-w-[1200px] mx-auto p-5 text-[var(--text-color)] animate-fadeIn">
            <div className="mt-20 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-[var(--white)] p-16 rounded-xl text-center mb-10 shadow-lg transform transition-transform hover:-translate-y-1">
                <h1 className="text-[2.5em] text-[var(--tit)] mb-4  animate-slide-down">Welcome to The Royal Mobiles</h1>
                <p className="text-lg opacity-90 max-w-xl mx-auto  animate-slide-up">
                    Your trusted destination for the latest mobile phones and accessories.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
                <section className="bg-[var(--white)] p-8 rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-[var(--primary-color)] mb-5 text-[1.8em] pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-[var(--secondary-color)] hover:after:w-[100px] after:transition-all">
                        Who We Are
                    </h2>
                    <p className="leading-relaxed text-[var(--text-color)] mb-4">
                        At <strong>The Royal Mobiles</strong>, we pride ourselves on offering the best in mobile technology, accessories, and customer service.
                        Located in the heart of {User.address} we are committed to delivering value and quality to our customers.
                    </p>
                </section>

                <section className="bg-[var(--white)] p-8 rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-[var(--primary-color)] mb-5 text-[1.8em] pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-[var(--secondary-color)] hover:after:w-[100px] after:transition-all">
                        Why Choose Us?
                    </h2>
                    <ul className="list-none pl-0">
                        <li className="mb-3 pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-[var(--secondary-color)]">
                            Wide range of smartphones from top brands.
                        </li>
                        <li className="mb-3 pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-[var(--secondary-color)]">
                            Quality accessories to enhance your mobile experience.
                        </li>
                        <li className="mb-3 pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-[var(--secondary-color)]">
                            Affordable prices and exclusive deals.
                        </li>
                        <li className="mb-3 pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-[var(--secondary-color)]">
                            Dedicated customer support and after-sales service.
                        </li>
                    </ul>
                </section>

                <section className="bg-[var(--white)] p-8 rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-[var(--primary-color)] mb-5 text-[1.8em] pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-[var(--secondary-color)] hover:after:w-[100px] after:transition-all">
                        Our Vision
                    </h2>
                    <p className="leading-relaxed text-[var(--text-color)] mb-4">
                        To be the leading mobile and accessories hub in Tamil Nadu by providing exceptional service, the latest products,
                        and a seamless shopping experience.
                    </p>
                </section>

                <section className="bg-[var(--white)] p-8 rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl col-span-full">
                    <h2 className="text-[var(--primary-color)] mb-5 text-[1.8em] pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-[var(--secondary-color)] hover:after:w-[100px] after:transition-all">
                        Contact Us
                    </h2>
                    <p className="leading-relaxed text-[var(--text-color)] mb-4">
                        Have questions or need assistance? We're here to help! <br />
                        <strong>Phone:</strong> {User.phone} <br />
                        <strong>Email:</strong> <Link to={`mailto:${User.mail}`} className="text-[var(--secondary-color)] hover:text-[var(--accent-color)] transition-colors">{User.mail}</Link> <br />
                        <strong>Address:</strong> {User.address} <br />
                        <strong>Website:</strong> <Link to={User.weburl} target="_blank" rel="noopener noreferrer" className="text-[var(--secondary-color)] hover:text-[var(--accent-color)] transition-colors">
                            {User.weburl.slice(8)}
                        </Link>
                    </p>
                </section>
            </div>

            <div className="w-[50vw] max-w-full mx-auto mt-5 md:w-full">
                <iframe className="w-full h-[400px] rounded-xl border-0" title="Location map" src={User.embedMap} />
            </div>
        </div>
    );
};

export default About;
