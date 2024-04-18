import React from 'react';
import "./Navbar.css";
import appIcon from "../../img/navLogo.png";
import searchIcon from "../../img/icons/searchIcon.png";
import { Home, People, Work, Business, Notifications, Message } from '@material-ui/icons'; 

export default function Navbar(){
    return(
        <div className = 'mainNavbar'>
            <div className = 'header'>
                <img src={`${appIcon}`} alt="" className='appIcon'/>
                <div className='searchBox'>
                    <div searchIcon><img src={`${searchIcon}`} alt="" /></div>
                    <input type="text" placeholder="Search"/>                 
                </div>
                <div className='navBar-menu'>
                    <a href="#empHome"><Home style={{ color: '#873B78' }} /></a>
                    <a href="#network"><People style={{ color: '#873B78' }} /></a>
                    <a href="#jobs"><Work style={{ color: '#873B78' }} /></a>
                    <a href="#company"><Business style={{ color: '#873B78' }} /></a>
                    <a href="#notification"><Notifications style={{ color: '#873B78' }} /></a>
                    <a href="#messages"><Message style={{ color: '#873B78' }} /></a>
                </div>

                <div className='nav-profile'>
                    <div className='profileCircle'>
                         {/* Add profile picture */}
                    </div>
                </div>
                
            </div>
        </div>
    )
};