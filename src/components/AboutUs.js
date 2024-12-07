import React from 'react';
import { Typography } from 'antd';
import '../styles/AboutUsStyles.css'; 
import HomeCare1 from '../assets/Homecare2.jpeg'; 

const { Title, Paragraph } = Typography;

const AboutUs = () => {
    return (
        <div className="text-center about-us">
            <Title level={2} className="about-title"><h2>About Us</h2></Title>
            <div className="about-content">
                <div className="about-text">
                    <Title><h4>Personalized Care</h4></Title>
                    <Paragraph style={{ fontSize: '20px', lineHeight: '1.6' }}>
                        At HomeCare, we provide compassionate and professional medical assistance to individuals in the comfort of their homes. Our dedicated team of healthcare professionals is committed to delivering personalized care tailored to meet the unique needs of each client. Whether it's assistance with daily activities, medication management, or specialized medical care, we are here to ensure your loved ones receive the best support possible.
                    </Paragraph>
                </div>
                <img src={HomeCare1} alt="Home Care Service" className="about-image" />
            </div>
        </div>
    );
};

export default AboutUs;