import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import moment from 'moment'
import axios from 'axios'
import {message, Table} from 'antd'

const NurseAppointments = () => {
    const [appointments,setAppointments] = useState([])
    const getAppointments = async(req,res)=>{
      try {
          const res = await axios.get('/api/v1/nurse/nurse-appointments',{
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
    const handleStatus =  async(record,status)=>{
        try {
            const res = await axios.post('/api/v1/nurse/update-status',{
                appointmentId:record._id,
                status
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                message.success(res.data.message);
                getAppointments()
                 
            }
        } catch (error) {
            console.log(error)
            message.error("Something went wrong")
        }
    }
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
        {
            title:'Actions',
            dataIndex: 'actions',
            render:(text,record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                            <div className="d-flex">
                                    <button className='btn btn-success ms-2' onClick={()=>handleStatus(record,'approve')} style={{backgroundColor:'#28a745'}}>Approve</button>
                                    <button className='btn btn-dange ms-2' onClick={()=>handleStatus(record,'reject')} style={{backgroundColor:'#dc3545'}}>Reject</button>
                            </div>
                    )}
                </div>
                
            )
        }
      ];
  return (
    <Layout>
        <h1>Appointments List</h1>
        <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
}

export default NurseAppointments