/*import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import NavHeader from '../components/NavHeader';
import { selectToken } from '../rtk/slices/Auth-slice';
import { useEffect } from 'react';
import WhatsAppIcon from '../components/Whatsapp';
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import './profileInfo.css';


function ProfileInfo() {
  const dispatch = useDispatch();
  const bearerToken = useSelector(selectToken);
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    region: '',
    street: '',
    zipCode: '',
  });

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleProductClick = (productId) => {
    // Assuming you have a function for handling product clicks
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        'http://195.35.28.106:8080/api/v1/user/en/update',
        userData,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );
      console.log('User data updated successfully', response.data);

      // Update user address if editing
      if (isEditing) {
        const addressResponse = await axios.post(
          'http://195.35.28.106:8080/api/v1/user/address/new',
          {
            country: userData.country,
            city: userData.city,
            region: userData.region,
            street: userData.street,
            zipCode: userData.zipCode,
          },
          {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          }
        );
        console.log('User address updated successfully', addressResponse.data);
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://195.35.28.106:8080/api/v1/user/en',
          {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          }
        );
        setUserData(response.data.data.user);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [bearerToken]);

  return (
    <div>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr cartGreen">
        <div className="header-container testtt">
          <WhatsAppIcon />
          <div className="userinfoContainer">
            <div className="imgInfo">
              <FaUser style={{ fontSize: '60px', color: 'black' }} />
              <h5>{userData.email}</h5>
              <button style={{color: 'white'}} onClick={handleEditClick}>{translations[language]?.edit}</button>
            </div>

            <div className="userdetailsInfo">
              <div className="flexinput">
                <input
                  className="name"
                  type="text"
                  name="country"
                  placeholder={translations[language]?.country}
                  value={userData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <input
                  className="name"
                  type="text"
                  name="city"
                  placeholder={translations[language]?.city}
                  value={userData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="flexinput">
              <input
                  className="name"
                  type="text"
                  name="region"
                  placeholder={translations[language]?.region}
                  value={userData.region}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <input
                  className="name"
                  type="text"
                  name="street"
                  placeholder={translations[language]?.street}
                  value={userData.street}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="flexinput">
              <input
                  className="name"
                  type="text"
                  name="zipCode"
                  placeholder={translations[language]?.zipcode}
                  value={userData.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
               
              </div>

              {isEditing && (
                <div className="flexinput flexbutton">
                  <button onClick={handleSaveClick}>{translations[language]?.save}</button>
                  <button onClick={handleCancelClick}>{translations[language]?.cancel}</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="footerr footerPhr">
            <div className=" header-container ">
              <div className="flexFooter">
                <div className="cartfooter">
                  <div className="important">
                    <h1>{translations[language]?.important}</h1>
                    <Link className="footerlink">{translations[language]?.privacy} </Link>
                    <Link className="footerlink">{translations[language]?.cookies} </Link>
                    <Link className="footerlink">{translations[language]?.terms} </Link>
                  </div>
                  <div className="information">
                    <h1>{translations[language]?.information}</h1>
                    <h2>
                    {translations[language]?.pfooter}
                    </h2>
                  </div>
                </div>
                <div className="cartfooter cartfootertwo">
                  <div className="important">
                    <h1>{translations[language]?.contactdetails}</h1>
                    <h2>
                    {translations[language]?.require}
                    </h2>
                  </div>
                  <div className="address">
                    <div className="flexaddress">
                      <img src={address} />
                      <h2>{translations[language]?.addresscontact}</h2>
                    </div>
                    <h2>
                    {translations[language]?.addfooterone} <br />
                    {translations[language]?.addfootertwo}
                    </h2>
                  </div>
                  <div className="flexphoneemail">
                    <div className="address">
                      <div className="flexaddress">
                        <img src={phone} />
                        <h2>{translations[language]?.phonenumber}:</h2>
                      </div>
                      <h2>00212689831227</h2>
                    </div>
                    <div className="address">
                      <div className="flexaddress">
                        <img src={email} />
                        <h2>{translations[language]?.email}:</h2>
                      </div>
                      <h2>contact@vitaparapharma.com</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
export default ProfileInfo;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import { selectToken } from '../rtk/slices/Auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import NavHeader from '../components/NavHeader';
import WhatsAppIcon from '../components/Whatsapp';

import emaill from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phonee from "../images/phone icon.png";
import Footer from '../components/Footer';
import './profileInfo.css';
import { baseUrl } from '../rtk/slices/Product-slice';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const bearerToken = useSelector(selectToken);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/profile`, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Accept-Language': language,
          },
        });
        setUserData(response.data.data.user);
        
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [bearerToken, language]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleSave = async () => {
    try {
      await axios.put(`${baseUrl}/user/update`, {
        email,
        phone,
      }, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Accept-Language': language,
        },
      });
      setUserData(prevUserData => ({
        ...prevUserData,
        email,
        phone,
      }));
      setEditMode(false);
      console.log('succ edit');
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div>
      <div>
        <NavHeader
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <div className="green-containerr cartGreen">
          <div className="header-container testtt">
            <WhatsAppIcon />
            <div className="userinfoContainer">
            <div className="userdetailsInfo">
              
                {userData && (
                  <>
                    <p className="userDetail">Email: {editMode ? (
                      <input
                        type="text"
                        name=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ) : userData.email}</p>
                    <p className="userDetail">Phone: {editMode ? (
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    ) : userData.phone}</p>

                    
                  </>
                )}
                {editMode ? (
                  <button className='saveedit' onClick={handleSave}>{translations[language]?.save}</button>
                ) : (
                  <button className='saveedit' onClick={() => setEditMode(true)}>{translations[language]?.edit}</button>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}


export default UserProfile;

