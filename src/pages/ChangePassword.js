import './changepassword.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../rtk/slices/Auth-slice';
import Footer from '../components/Footer';
import axios from 'axios';  // Import Axios
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import NavHeader from '../components/NavHeader';
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { Link } from "react-router-dom";
import { baseUrl } from '../rtk/slices/Product-slice';

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const bearerToken = useSelector(selectToken);
  
  const handleSaveClick = async () => {
    try {
      const apiUrl = `${baseUrl}/user/password/update`;

      const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json', 
      };

      const response = await axios.put(apiUrl, {
        oldPassword: currentPassword,
        newPassword: newPassword,
      }, { headers });

      if (response.data && response.data.success) {
        console.log('Password updated successfully');
      } else {
        console.error('Failed to update password:', response.data);
      }
    } catch (error) {
      console.error('Error updating password:', error);
     
    }
  };


  

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  return (
    <div>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr cartGreen ">
        <div className="header-container">
          <div className='changePasswordText'>
          
            <h2>{translations[language]?.change}</h2>
            <h6>{translations[language]?.choose}</h6>
            <h6>{translations[language]?.changing}</h6>
          </div>
          <div className='changePasswordInputs'>
            <input
              className="name"
              type="password"
              name="newPassword"
              placeholder={translations[language]?.newpass}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              className="name"
              type="password"
              name="currentPassword"
              placeholder={translations[language]?.oldpass}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <div className="flexinput flexbutton">
              <button onClick={handleSaveClick}>{translations[language]?.save}</button>
              <button>{translations[language]?.cancel}</button>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default ChangePassword;
