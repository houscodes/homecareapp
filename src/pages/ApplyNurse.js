import React from 'react'
import Layout from '../components/Layout';
import{ Form,Row,Col,TimePicker,message } from 'antd';
import Input from 'antd/es/input/Input';
import{useSelector,useDispatch} from 'react-redux';
import{useNavigate} from 'react-router-dom';
import { showloading,hideloading } from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';

const ApplyNurse = () => {
  //now writing the handle how do we handle the form
  //ta7et bef form la7 esta3mil bootstrap la7atta a3mel l form taba3 el input
  const {user} = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlefinish = async(values)=>{
    try {
      dispatch(showloading());
      const res = await axios.post(
        "/api/v1/user/apply-nurse",
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
  return (
    <Layout>
    <h1 className="tex-center m-3">Apply Nurse</h1>
    <Form layout='vertical' onFinish={handlefinish} className='m-3' >
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
          <button className='btn btn-primary form-btn' type='submit'>Submit</button>
        </Col>
      </Row>
    </Form>
    </Layout>
  )
}

export default ApplyNurse


//hawde yale bel foem badon ykuno metel el schema yale 3emlta lal nurse yale hiye el model
//gutter bel form 3ashen el space
// now the data stored in the local storage we will send it to the backend and then deal with it so lezim a3mil controller to handle this data
//we will create an api and connected with the form
