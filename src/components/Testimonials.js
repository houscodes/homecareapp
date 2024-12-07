import React from 'react';
import { Card } from 'antd';
import '../styles/Testimonials.css'
import nurseImage1 from '../assets/freepik__candid-image-photography-natural-textures-highly-r__97008.jpeg';
import nurseImage2 from '../assets/freepik__candid-image-photography-natural-textures-highly-r__97009.jpeg';
import patient1 from '../assets/freepik__candid-image-photography-natural-textures-highly-r__97015.jpeg';
import patient2 from '../assets/freepik__candid-image-photography-natural-textures-highly-r__97013.jpeg';

const testimonialsData = [
    { name: 'Amanda Paul', feedback: 'Great experience working here!', role: 'Nurse', image: nurseImage1 },
    { name: 'Jhon Doston', feedback: 'Wonderful team and patients!', role: 'Nurse', image: nurseImage2 },
    { name: 'Molly Smith', feedback: 'I received amazing care!', role: 'Patient', image: patient1 },
    { name: 'Eddy Jhonson', feedback: 'The staff is very compassionate!', role: 'Patient', image: patient2 },
]; 

const Testimonials = () => {
    return (
        <section id='testimonials' className='testimonials'>
            <h2 className='text-center'>Testimonials</h2>
            <div className='cards'>
                {testimonialsData.map((testimonial, index) => (
                    <Card key={index} title={testimonial.name} bordered={false}>
                        <img src={testimonial.image} alt={testimonial.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                        <p>{testimonial.feedback}</p>
                        <p><strong>{testimonial.role}</strong></p>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;