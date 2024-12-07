import React from 'react';
import '../styles/LayoutStyles.css';
import { adminMenu, userMenu } from '../Data/data';
import {Link,Navigate,useLocation, useNavigate} from 'react-router-dom';
import {Badge, message} from 'antd';
import { useSelector } from 'react-redux';

const Layout = ({children}) => {
    const {user} = useSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async()=>{
        localStorage.clear()
        message.success('Logged out Successfuly')
        navigate('/login')
    };
    //hon la7 n7ot el nurse menu
    const nurseMenu= [{    //hon 3am 2ati3 el data as an array lal layout yale fi bi alba menu sidebar
        name:'Home',
        path:'/',
        icon:'fa-solid fa-house',
    },
    {
        name:'Appointmnets',
        path:"/nurse-appointments",
        icon:'fa-solid fa-list',
    
    },
    {
        name: 'Profile',
        path:`/nurse/profile/${user?._id}`,
        icon:'fa-solid fa-user',
    },
    ]
    

   const SidebarMenu = user?.isAdmin? adminMenu:user?.isNurse? nurseMenu:userMenu;
  return (
    <>
    <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'>
                        <h6>HomeCare App</h6>
                        <hr/>
                    </div>
                    <div className='menu'>
                        {SidebarMenu.map((menu)=>{
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                <div className={`menu-item ${isActive && "active"}`}>
                                     <i className={menu.icon}></i>
                                     <Link to={menu.path}>{menu.name}</Link>
                                </div>
                                </>
                            )
                        })}
                        <div className={`menu-item`} onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to="/login">Logout</Link> 
                        </div>
                    </div>

                </div>
                <div className='content'>
                    <div className='header'>
                        <div className='header-content' style={{cursor:"pointer"}}>
                         <Badge count={user && user.notification.length} onClick={()=>{navigate('/notification')}} >  
                        <i class="fa-solid fa-bell"></i>
                        </Badge> 
                        <Link to="/profile">{user?.name}</Link>
                    </div>
                    </div>
                    <div className='body'>{children}</div>
                </div>
            </div>
    </div>
    </>
  )
}

export default Layout

//hala2 brou7 3al home page ba3mello wrap honik