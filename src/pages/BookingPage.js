import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch,useSelector } from "react-redux";
import {showloading,hideloading } from "../redux/features/alertSlice"

const BookingPage = () => {
  const {user} = useSelector(state => state.user);
  const params = useParams();
  const [nurses, setNurses] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  const getUserData = async (req, res) => {
    try {
      const res = await axios.post( 
        "/api/v1/nurse/getNurseById",
        { nurseId: params.nurseId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setNurses(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBooking = async(req,res)=>{
    try {
      setIsAvailable(true);
      if(!date && !time){
        return alert("Date and Time are Required")
      }
      const res = await axios.post("/api/v1/user/book-appointment",{
        nurseId:params.nurseId,
        userId:user._id,
        nurseInfo:nurses,
        userInfo:user,
        date:date,
        time:time,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        }
      })
      dispatch(hideloading())
      if(res.data.success){
        message.success(res.data.message)
      }
    } catch (error) {
      dispatch(hideloading())
      console.log(error)
      
    }
  }
  const handleAvailability = async(req,res)=>{
      try {
        dispatch(showloading())
        const res = await axios.post("/api/v1/user/booking-availability",
          {
          nurseId:params.nurseId,
          date,
          time,
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        dispatch(hideloading());
        if(res.data.success){
          setIsAvailable(true)
          message.success(res.data.message)
        }else{
          message.error(res.data.message)
        }
        
      } catch (error) {
        dispatch(hideloading())
        console.log(error)
      }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {nurses && (
          <div>
            <h4>
              Nurse {nurses.firstName} {nurses.lastName}
            </h4>
            <h4>Fees Per consultation: {nurses.feesPerConsultation}</h4>
            <h4>Specialization: {nurses.specialization}</h4>
            <h4>
              Availability: {nurses.timings && nurses.timings[0]} -{" "}
              {nurses.timings && nurses.timings[1]}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) =>{
                  setDate(moment(value).format("DD-MM-YYYY"))
                }}
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button className="btn btn-primary m-2" onClick={handleAvailability}>
                Check Availability
              </button>
              <button className="btn btn-primary m-2" onClick={handleBooking}>Book now</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;

//lezim ma ykun el book now button fine a3mello click ella eza 3melt check w ken fi majel