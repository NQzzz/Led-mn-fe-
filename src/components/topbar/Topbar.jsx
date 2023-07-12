import React from 'react';
import './topbar.css';
// import { NotificationsNone, Language, Settings,AccountBoxIcon } from '@material-ui/icons';
import { NotificationsNone, Language, Settings, AccountBox } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Topbar() {
  const data = Cookies.get('user');
  const userData = data ? JSON.parse(data) : undefined;
  console.log(userData);
  const toggleUserWindow = () => {
    const userWindow = document.getElementById('userWindow');
    userWindow.classList.toggle('show');
  };

  const logout = () => {
    // Perform logout logic here
    alert('Logged out!');
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">LED MN</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
            onClick={toggleUserWindow}
          />
        </div>
      </div>

      <div className="userWindow" id="userWindow">
        <div className="userWindowContent">
        <Link to="/profile">
        <div className="WindowContentIcon"> 
        <AccountBox/>
        </div><p>{userData.name} </p>
        </Link>
        <Link to="/settings">
        <div className="WindowContentIcon">
            <Settings />
          </div>
          <p>setting</p>
          </Link>
          <button className="userWindowButton" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
