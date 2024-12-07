import React from 'react';
import { Button, Layout } from 'antd';
import '../styles/HeaderStyles.css'; 

const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Header className="header">
            <div className="logo">
                <h1 className="app-name">HomeCare</h1>
            </div>
            <div className="header-buttons">
                <a href="#about-us">
                    <Button className="header-button">About Us</Button>
                </a>
                <a href="#registration-form">
                    <Button className="header-button">Register</Button>
                </a>
                <a href="#testimonials">
                    <Button className="header-button">Testimonials</Button>
                </a>
                <a href="#contact-us">
                    <Button className="header-button">Contact Us</Button>
                </a>
                <a href="#follow-us">
                    <Button className="header-button">Follow Us</Button>
                </a>
            </div>
        </Header>
    );
};

export default HeaderComponent;