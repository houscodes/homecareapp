import Layout  from './../components/Layout';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';
const Appointments = () => {
  const [appointments,setAppointments] = useState([])
  const getAppointments = async(req,res)=>{
    try {
        const res = await axios.get('/api/v1/user/user-appointmnents',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(res.data.success){
            setAppointments(res.data.data);
        }
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    getAppointments();
  },[])
  const columns = [  
    {
        title:'Date & Time',
        dataIndex: 'date',
        render:(text,record) => (
            <span>
                {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                {moment(record.time).format("HH:mm")}
            </span>
        )
    },
    {
        title:'Status',
        dataIndex: 'status',
    },
  ]
  return (
    <Layout>
    <div>
        <h1>Appointments List</h1>
        <Table columns={columns} dataSource={appointments}/>

    </div>
    </Layout>
  )
}

export default Appointments

//lezim a3mil store lal appointments yale 3ande yehon w a3meloon display fa la7 e4la2 array 7otton bi alba
//datasource hiye el appointments la anno ana 7atet bi alba el appointments
