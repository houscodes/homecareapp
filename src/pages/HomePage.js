import React, { useEffect,useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import NurseList from "../components/NurseList";
const HomePage = () => {
  const [nurses,setNurses] = useState([])
  const getUserData = async (req,res) => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllNurses",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setNurses(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {nurses && nurses.map((nurse) =><NurseList nurse={nurse}/>)}
      </Row>
      </Layout>

  );
};

export default HomePage;
//la7 a3mellon display ka grid items w besta3mil row w columns men el antd components