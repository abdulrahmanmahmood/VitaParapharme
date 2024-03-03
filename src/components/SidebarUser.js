// SidebarUser.js
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaHeart, FaShoppingCart , FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineWifiPassword } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useEffect } from 'react';
import ChangePassword from '../pages/ChangePassword';
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import { useSelector } from 'react-redux';
import './sidebaruser.css';

function SidebarUser({ isOpen, onClose , handleLogout  }) {

  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  
  const handleLogoutClick = () => {
    handleLogout();
    onClose();
};

const handleIconClick = (event) => {
  event.stopPropagation();
  if (!isOpen) {
    onClose();
  }
};


const direction = useSelector((state) => state.translation.direction);


    return (
      <div className={`flexLanguage ${direction === "rtl" ? "rtl" : "ltr"}`}>
        <div className={`sidebaruser ${isOpen ? 'open' : ''}`}>
          
            <nav className="sidebar-nav">
            <Link to="/profile" className="cart-link">
              <FaUser style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>{translations[language]?.myprofile}</h5>
            </Link>

            <Link to="/order" className="cart-link">
              <FaBars style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>{translations[language]?.orders}</h5>
            </Link>
            <Link to="/wishlist" className="cart-link">
              <FaHeart style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>{translations[language]?.wishlist}</h5>
            </Link>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>{translations[language]?.cart}</h5>
            </Link>
            <Link to="/changePassword" className="cart-link">
              <MdOutlineWifiPassword style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>{translations[language]?.changepass}</h5>
            </Link>
            
            <Link  onClick={handleLogoutClick} className="cart-link">
              <IoIosLogOut style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>{translations[language]?.logout}</h5>
            </Link>
    
            </nav>
           
        </div>
        </div>
    );
}

export default SidebarUser;
