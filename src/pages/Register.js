import React from 'react';
import {Form,Input,message} from 'antd';
import '../styles/RegisterStyles.css';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { showloading,hideloading } from '../redux/features/alertSlice';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import Testimonials from '../components/Testimonials';
import HeaderComponent from '../components/Header';
import AboutUs from '../components/AboutUs';

const Register = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onfinishHandler = async (values) =>{
        try {
            dispatch(showloading());
            const res = await axios.post('/api/v1/user/register', values)
            dispatch(hideloading());
            if(res.data.success){
                message.success('Registration successful !')
                navigate('/login')
            }else{
                message.error(res.data.message)
            }
            
        } catch (error) {
            dispatch(hideloading());
            console.log(error)
            message.error('Something went wrong')
        }
    };
  return (
    <>
        <HeaderComponent/>
        <div id='about-us'>
         <AboutUs/>
        </div>
        <div className='form-container' id="registration-form">
            <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
                <h3 className='text-center'>Registration Form</h3>
                <Form.Item label="Name" name="name">
                    <Input type = "text" required />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <Link to="/login" className='m-2'>Login here</Link>
                <button className='btn btn-primary' type='submit'>Register</button>
            </Form>

        </div>
        <div id="testimonials">
        <Testimonials/>
        </div>
        <div id="contact-us">
        <ContactUs/>
        </div>
        <div id="follow-us">
        <Footer/>
        </div>
    
    </>
  )
}

export default Register