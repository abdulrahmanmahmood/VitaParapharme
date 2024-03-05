import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import { selectToken } from "../rtk/slices/Auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import NavHeader from "../components/NavHeader";
import WhatsAppIcon from "../components/Whatsapp";

import emaill from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phonee from "../images/phone icon.png";
import Footer from "../components/Footer";
import "./profileInfo.css";
import { baseUrl } from "../rtk/slices/Product-slice";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const bearerToken = useSelector(selectToken);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
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
      await axios.put(
        `${baseUrl}/profile/update`,
        {
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
          },
        }
      );
      setUserData((prevUserData) => ({
        ...prevUserData,
        email,
        phone,
      }));
      setEditMode(false);
      console.log("succ edit");
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
        <div className="bg-gray-50 bottom-0 overflow-y-hidden mt-[100px]">
          <div className="mb-20 relative top-12 lg:top-0 lg:mx-12 overflow-y-hidden md:px-5 sm:px-2">
            <WhatsAppIcon />
            <div className="flex justify-center items-center w-full md:w-3/5 mx-auto mt-32">
              <div className="w-full md:w-70 flex flex-col justify-center items-center bg-[#3EBF87] rounded-3xl p-6">
                {userData && (
                  <>
                    <div className="mb-3 flex flex-row">
                      <p className="text-lg  text-white ">Email:</p>
                      {editMode ? (
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3EBF87]"
                        />
                      ) : (
                        <p className="text-lg text-white">{userData.email}</p>
                      )}
                    </div>
                    <div className="mb-3 flex flex-row">
                      <p className="text-lg text-white mr-1">Phone:</p>
                      {editMode ? (
                        <input
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3EBF87]"
                        />
                      ) : (
                        <p className="text-lg text-white">{userData.phone}</p>
                      )}
                    </div>
                  </>
                )}
                {editMode ? (
                  <button
                    className="text-[#3EBF87] mb-3 bg-white w-full md:w-24 h-12 rounded-lg"
                    onClick={handleSave}
                  >
                    {translations[language]?.save}
                  </button>
                ) : (
                  <button
                    className="text-[#3EBF87] mb-3 bg-white w-full md:w-24 h-12 rounded-lg"
                    onClick={() => setEditMode(true)}
                  >
                    {translations[language]?.edit}
                  </button>
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
