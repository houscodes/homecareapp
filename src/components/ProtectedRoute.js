// Hayde 3ashen eza an 3emil login ma erja3 yotolb menna login aw register
//lezim bas a3mil login ma erja3 fout
//ana eza ma3e token ma byerja3 bi sir hal shi 
//hala2 fi 7al ana 3emil log in w reje3 7ada talab ya3mel log in w huwe jouwa bi rou7 d8re 3al Home
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux' ;
import axios from 'axios';
import { hideloading, showloading } from '../redux/features/alertSlice';
import { token } from 'morgan';
import { setUser } from '../redux/features/userSlice';

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user);
    const getUser = async()=>{
        try {
            dispatch(showloading())
            const res = await axios.post('/api/v1/user/getUserData',{
                token: localStorage.getItem('token')
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideloading())
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }else{
                <Navigate to="/login"/>
                localStorage.clear();   //la7ata shil el token bi batel se3eta mawjoud el token bel local storage
            }
        } catch (error) {
            dispatch(hideloading())
            localStorage.clear();
            console.log(error)
        }

    }

    useEffect(()=>{
        if(!user){
            getUser()
        }
    },[user,getUser])
    if (localStorage.getItem("token")) {
        return children; 
    } else {
        return <Navigate to="/login" />; 
    }
}
