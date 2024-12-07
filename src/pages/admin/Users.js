import React,{useEffect,useState} from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { Table } from 'antd';


const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async()=>{
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      if(res.data.success){
        setUsers(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    getUsers () 
  },[])

  //hon la7 a3mel el antd table col lezim bel dataIndex metel ma ana sammayto bel model taba3e
  const columns = [
    {
      title: 'Name',
      dataIndex:'name',
    },
    {
      title: 'Email',
      dataIndex:'email',
    },
    {
      title: 'Nurse ',
      dataIndex:'isNurse',
      render:(text,record)=>(
        <span>{record.isNurse ? 'Yes':'No'}</span>
    )
    },
    {
      title: 'Actions',
      dataIndex:'actions',
      render:(text,record)=>{
        return(
        <div className='d-flex' >
            <button style={{backgroundColor:'#dc3545'}} className='btn'>Block</button>
        </div>
      )}
    }
  ]
  return (
    <Layout>
        <h1 className=' text-center m-3'>Users List</h1>
        <Table columns={columns} dataSource={users}/>
    </Layout>

)
}

export default Users
// hon la7 a3mil el display tab3 el users yalle msajalin 3ande
//initially el array la7 tkun empty 
// lama 3am 3ayyit la hayde el api call yale hiye get allusers 3am bi sir fi probeleme huwe eno 304 bs bel response mbayne el data
//to show the data I will use antd table design