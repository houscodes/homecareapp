import React,{useEffect,useState} from 'react';
import Layout from './../../components/Layout'
import axios from 'axios';
import { Table,message } from 'antd';

const Nurses = () => {
  const [nurses, setNurses] = useState([]);
  const getNurses = async()=>{
    try {
      const res = await axios.get('/api/v1/admin/getAllNurses',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      if(res.data.success){
        setNurses(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  };
  //handling the account kamen hon wa2ta el admin ya3mello approve bi battil fi ya3mel apply marra tenye fa lezim 8ayir bel side bar fa 8ayyarta hon
  const handleAccountStatus = async(record,status)=>{
    try {
      const res = await axios.post('/api/v1/admin/changeAccountStatus',{nurseId: record._id,userId:record.userId,status:status},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error('Something went wrong')
    }
  }
  useEffect(()=>{
    getNurses () 
  },[]);
  const columns = [
    {
      title: ' First Name',
      dataIndex:'firstName',
    },
    {

        title: 'Last Name',
        dataIndex:'lastName',

    },
    {
      title: 'Email',
      dataIndex:'email',
    },
    {
      title: 'Nurse ',
      dataIndex:'isNurse',
      render:(text,record)=>(
        <span>{'Yes'}</span>
    )
    },
    {
      title: 'Status',
      dataIndex:'status',
    },
    {
        title:'Phone',
        dataIndex:'phone',
    },
    {
      title: 'Actions',
      dataIndex:'actions',
      render:(text,record)=>{
        return(
        <div className='d-flex' >
            {record.status === "pending" ? <button className='btn ' style={{backgroundColor:'#28a745'}} onClick={()=> handleAccountStatus(record,"approved")} >Approve</button>:<button className='btn' style={{backgroundColor:'#dc3545'}} >Reject</button>}
        </div>
      )}
    }
  ]
  return (
    <Layout>
        <h1 className='text-center m-3'>All Nurses</h1>
        <Table columns={columns} dataSource={nurses}/>
    </Layout>
  )
}

export default Nurses