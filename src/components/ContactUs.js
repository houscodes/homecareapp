import React from 'react';
import '../styles/ContactUs.css'; 

const ContactUs = () => {
    return (
        <section id='contact' className='contact-us'>
            <h2>Contact Us</h2>
            <p>If you have any questions, please reach out to us!</p>
            <div className="contact-info">
                <div className="info-item">
                    <i className="fas fa-phone-alt"></i>
                    <div>
                        <h4>Phone Numbers</h4>
                        <p>(+961) 70-882-351</p>
                        <p>(08) 377-055</p>
                    </div>
                </div>
                <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                        <h4>Email</h4>
                        <p>info@homecareapp.com</p>
                    </div>
                </div>
                <div className="info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                        <h4>Address</h4>
                        <p>Bechara El Khoury St, Beirut City, Al Rayyan Building</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;