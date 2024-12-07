import React,{useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import{ Form,Row,Col,TimePicker,message } from 'antd';
import Input from 'antd/es/input/Input';
import{useSelector,useDispatch} from 'react-redux';
import{useNavigate} from 'react-router-dom';
import { showloading,hideloading } from '../../redux/features/alertSlice';
import moment from "moment";

const Profile = () => {
  const{user} = useSelector(state => state.user)
  const [nurse,setNurse] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const handlefinish = async(values)=>{
    try {
      dispatch(showloading());
      const res = await axios.post(
        "/api/v1/nurse/updateProfile",
        { ...values, userId: user._id,
          timings:[
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ]
         },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  //getNurse details , hayde el id yalle 3am besta3mela hiye dynamic ya3ne lal current user aw bel a7ra lal current nurse
  const getNurseInfo = async () => {
    try {
      const res = await axios.post('/api/v1/nurse/getNurseInfo',{userId:params.id},{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      })
      if(res.data.success){
          setNurse(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    getNurseInfo();
  },[])
  return (
    <Layout>
        <h1>Manage your Profile</h1>
        {nurse &&(
             <Form layout='vertical' onFinish={handlefinish} className='m-3'initialValues={{
              ...nurse,
              timings: [
                moment(nurse.timings[0],'HH:mm'),
                moment(nurse.timings[1],'HH:mm') 
              ]
             }} >
             <h4 className=''>Personal Details :</h4>
               <Row gutter={20}> 
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>  
                   <Input type='text' placeholder='Your Name'/>
                 </Form.Item>
                 </Col>
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>  
                   <Input type='text' placeholder='Your LastName'/>
                 </Form.Item>
                 </Col>
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="Phone Number" name="phone" required rules={[{required:true}]}>  
                   <Input type='text' placeholder='Your Phone Number'/>
                 </Form.Item>
                 </Col>
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="Email" name="email" required rules={[{required:true}]}>  
                   <Input type='text' placeholder='Your eMAIL'/>
                 </Form.Item>
                 </Col>
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="Adress" name="address" required rules={[{required:true}]}>  
                   <Input type='text' placeholder='Your address'/>
                 </Form.Item>
                 </Col>
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="Website" name="website">  
                   <Input type='text' placeholder='Your Website'/>
                 </Form.Item>
                 </Col>
               </Row>
               <Row gutter={20}> 
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>  
                   <Input type='text' placeholder='Your specialization'/>
                 </Form.Item>
                 </Col>
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>  
                   <Input type='text' placeholder='Your experience'/>
                 </Form.Item>
                 </Col>
                 <Col xs={24} md={24} lg={8}>
                 <Form.Item label="Fees Per Consultation" name="feesPerConsultation" required rules={[{required:true}]}>  
                   <Input type='text' placeholder='Your fees Per Consultation'/>
                 </Form.Item>
                 </Col>
                 <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timings" name="timings" required rules={[{required:true}]}>  
                <TimePicker.RangePicker format="HH:mm"/>
                </Form.Item>
                </Col>
                 <Col xs={24} md={24} lg={8}></Col>
                 <Col xs={24} md={24} lg={8}>
                   <button className='btn btn-primary form-btn' type='submit'>Update</button>
                 </Col>
               </Row>
             </Form>
        )}
    </Layout>
  )
}

export default Profile


//la7 esta3mil moment package 3ashen zabit ossit el timing bel update

