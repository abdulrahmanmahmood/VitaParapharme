import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import clock from "../images/clock-svgrepo-com.png";
import email2 from "../images/email-1-svgrepo-com.png";
import path from "../images/path929.png";
import phone2 from "../images/phone-modern-svgrepo-com.png";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { Link } from "react-router-dom";
import WhatsAppIcon from "../components/Whatsapp";
import { selectToken } from "../../src/rtk/slices/Auth-slice";

import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import "./contact.css";
import axios from "axios";
import { baseUrl } from "../rtk/slices/Product-slice";

function Contact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const allProducts = useSelector((state) => state.products);
  const [UserEmail, setUserEmail] = useState(null);
  const bearerToken = useSelector(selectToken);
  const [contactData, setContactData] = useState({
    name: "",
    email: UserEmail,
    message: "",
  });

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const fetchUserEmail = async () => {
    try {
      const response = await axios.get(`${baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });
      setUserEmail(response.data.data.user.email);
      console.log(response.data.data.user.email);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUserEmail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      email: UserEmail,
      [name]: value,
    }));
    console.log(contactData);
  };

  const handleSubmit = async () => {
    if (!UserEmail) {
      alert("please sign in first");
      return;
    }
    try {
      const response = await axios.post(
        "https://email.vitaparapharma.com/api/v1/email-template/VITA_CONTACT_US",
        contactData
      );
      console.log("Response:", response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.log("Error submitting form:", error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="bg-gray-50 bottom-0 overflow-y-hidden mt-[200px] ">
        <div className="mt-5 relative top-12 lg:top-0 lg:mx-12 overflow-y-hidden md:px-5  sm:px-2">
          <WhatsAppIcon />
          <div className="flex flex-col lg:flex-row justify-between mb-10 ">
            <div className="w-full lg:w-2/5 mb-4 lg:mb-0 mr-5">
              <div className="flex flex-row  bg-white p-4 mb-4 min-h-40 rounded-xl shadow-md">
                <div className="flex items-center justify-center bg-[#61DAA2] w-20 h-20 rounded-full">
                  <img class="w-[50%] h-[50%] object-contain" src={path} />
                </div>
                <div className="w-60 ml-2">
                  <h4 className="text-green-500 font-semibold text-lg px-1">
                    {translations[language]?.addresscontact}
                  </h4>
                  <h2 className="text-black font-semibold text-base px-3 mb-0">
                    {translations[language]?.addressdescontact}
                  </h2>
                  <h2 className="text-black font-semibold text-base px-3 mb-0">
                    {translations[language]?.addressdescontacttwo}
                  </h2>
                </div>
              </div>

              <div className="flex flex-row  bg-white p-4 mb-4 min-h-40 rounded-xl shadow-md">
                <div className="flex items-center justify-center bg-[#61DAA2] w-20 h-20 rounded-full">
                  <img class="w-[50%] h-[50%] object-contain" src={clock} />
                </div>
                <div className="w-70">
                  <h4 className="text-green-500 font-semibold text-lg px-1">
                    {translations[language]?.hours}
                  </h4>
                  <h2 className="text-black font-semibold text-base px-3 mb-0">
                    {translations[language]?.day}
                  </h2>
                  <h2 className="text-black font-semibold text-base px-3 mb-0">
                    {translations[language]?.weekend}
                  </h2>
                </div>
              </div>

              <div className="flex flex-row  bg-white p-4 mb-4 min-h-40 rounded-xl shadow-md">
                <div className="flex items-center justify-center bg-[#61DAA2] w-20 h-20 rounded-full">
                  <img class="w-[50%] h-[50%] object-contain" src={phone2} />
                </div>
                <div className="w-70">
                  <h4 className="text-green-500 font-semibold text-lg px-1">
                    {translations[language]?.phonenumber}
                  </h4>
                  <h2 className="text-black font-semibold text-base px-3 mb-0">
                    00212689831227
                  </h2>
                </div>
              </div>

              <div className="flex flex-row  bg-white p-4 mb-4 min-h-40 rounded-xl shadow-md">
                <div className="flex items-center justify-center bg-[#61DAA2] w-20 h-20 rounded-full">
                  <img class="w-[50%] h-[50%] object-contain" src={email2} />
                </div>
                <div className="w-70">
                  <h4 className="text-green-500 font-semibold text-lg px-1">
                    {translations[language]?.email}
                  </h4>
                  <h2 className="text-black 500 font-semibold text-base px-3 mb-0">
                    contact@vitaparapharma.com
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-white w-full lg:w-3/5 p-5 rounded-xl relative h-100 shadow-md mr-4 mb-4">
              <div className="flex flex-col justify-between">
                <h4 className="text-[#3EBF87]  font-inter font-semibold text-2xl mb-9">
                  {translations[language]?.contactform}
                </h4>
                <input
                  type="text"
                  placeholder={translations[language]?.firstname}
                  name="name"
                  className="mb-9 h-14 rounded-lg border border-green-500 pl-5"
                  value={contactData.name}
                  onChange={handleChange}
                />
                {/* <input
                  type="text"
                  placeholder={translations[language]?.email}
                  name="email"
                  className="mb-9 h-14 rounded-lg border border-green-500 pl-5"
                /> */}
                <textarea
                  className="mb-9  rounded-lg border border-green-500 pl-5 py-3 "
                  placeholder={translations[language]?.message}
                  cols="100"
                  rows="5"
                  name="message"
                  value={contactData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="">
                <button className="bg-green-500 text-white h-10 rounded-lg px-5 mt-2"
                onClick={handleSubmit}
                >
                  {translations[language]?.submitcontact}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Contact;
