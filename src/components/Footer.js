import React from 'react';
import '../styles/Footer.css'; 

const Footer = () => {
    return (
        <footer id='footer' className='footer'>
            <div className="container">
                <div className="text-center">
                    <h3>Follow Us</h3>
                    <div className='social-links'>
                        <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>Facebook</a>
                        <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>Instagram</a>
                        <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>X</a>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>&copy; {new Date().getFullYear()} HomeCare Application. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;