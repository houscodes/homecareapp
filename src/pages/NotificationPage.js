//hayde el notification component
import React from 'react';
import Layout from './../components/Layout';
import {message, Tabs} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showloading,hideloading } from '../redux/features/alertSlice';
import axios from 'axios';
import{useNavigate} from 'react-router-dom'

const NotificationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const handleMarkAllRead = async()=>{
        try {
            dispatch(showloading())
            const res = await axios.post('/api/v1/user/get-all-notifications',{userId:user._id},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideloading())
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideloading())
            console.log(error)
            message.error("something went wrong")
        }
    };
    const handleDeleteAll = async()=>{
        try {
            dispatch(showloading())
            const res = await axios.post('/api/v1/user/delete-all-notifications',{userId:user._id},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideloading())
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error('something wen wrong in notifications')
        }
    };
    //hon ta7t 3am jib el messge men el user controller wa2t na3mel creation w 3am 7otta bi aleb card component
    // lezim wa2t a3mel mark as read ya3ne lezim trou7 el component men el unread lal read w la7 a3melon bel handle functions
  return (
    <Layout>
        <h4 className='p-3 m-3 text-center'> Notification Page</h4>
        <Tabs>
            <Tabs.TabPane tab='Unread'key={0}>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2' onClick={handleMarkAllRead}>Mark All As Read</h4>
                </div>
                {
                    user?.notification.map(notificationmessage => (
                            <div className='card' style={{cursor:"pointer"}}>  
                                <div className='card-text'  onClick={()=>navigate(notificationmessage.onClickPath)}>
                                    {notificationmessage.message}
                                </div>  
                            </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab='Read'key={1}>
                <div className='d-flex justify-content-end'>
                    <h4 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleDeleteAll}>Delete All</h4>
                </div>
                {
                    user?.seennotification.map(notificationmessage => (
                            <div className='card' style={{cursor:"pointer"}}>  
                                <div className='card-text'  onClick={()=>navigate(notificationmessage.onClickPath)}>
                                    {notificationmessage.message}
                                </div>  
                            </div>
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage