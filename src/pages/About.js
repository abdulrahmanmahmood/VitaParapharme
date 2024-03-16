import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../images/Vita Logo2.png";
import goal from "../images/goal.png";
import delivery from "../images/delivery.png";
import awards from "../images/awards.png";
import people from "../images/people.png";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { Link } from "react-router-dom";
import WhatsAppIcon from "../components/Whatsapp";
import Footer from "../components/Footer";

import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import NavHeader from "../components/NavHeader";
import "./about.css";

function About() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const allProducts = useSelector((state) => state.products);

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

  return (
    <div className="">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="bg-gray-50 bottom-0 overflow-y-hidden mt-[200px]">
        <div className=" ">
          <WhatsAppIcon />
          <div className="mb-[100px]">
            <div className="flex flex-col md:flex-row mt-3">
              <div className=" lg:w-[40%]  lg:-ml-20 h-[400px]  bg-white rounded-[50%] flex justify-center items-center  ">
                <img
                  className=" object-contain w-[40%] mr-0 h-[80%] my-auto lg:ml-36"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <div className="md:w-3/5 mx-auto relative w-[100%] ">
                <div>
                  <h5 className="mt-[16%]  font-inter text-[#3EBF87] text-center font-inter font-semibold text-2xl leading-normal">
                    {translations[language]?.aboutParagraph}
                  </h5>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-12 mx-10">
              <div className="bg-white shadow-xl w-[100%] md:w-[23%] min-h-[400px] flex flex-col justify-center items-center text-center rounded-2xl mr-2 mb-2">
                <div className="bg-[#3EBF87]  w-24 h-24 rounded-full flex justify-center items-center p-3 ">
                  <img
                    className="w-[100%] h-[100%] object-contain "
                    src={goal}
                    alt="goal"
                  />
                </div>
                <div className="m-1">
                  <h3 className="text-[#3EBF87] font-bold text-lg">
                    {" "}
                    {translations[language]?.accuracy}{" "}
                  </h3>
                  <p className="text-[#3EBF87] font-inter font-bold text-base">
                    {" "}
                    {translations[language]?.accuracyParagraph}
                  </p>
                </div>
              </div>
              <div className="bg-white shadow-xl w-[100%] md:w-[23%] min-h-[400px] flex flex-col justify-center items-center text-center rounded-2xl mr-2 mb-2">
                <div className="bg-[#3EBF87] mt-4 w-24 h-24 rounded-full flex justify-center items-center p-4">
                  <img
                    className="w-full h-full object-contain"
                    src={awards}
                    alt="awards"
                  />
                </div>
                <div className="m-1">
                  <h3 className="text-[#3EBF87] font-bold text-lg">
                    {" "}
                    {translations[language]?.awards}{" "}
                  </h3>
                  <p className="text-[#3EBF87] font-inter font-bold text-base">
                    {" "}
                    {translations[language]?.winners}{" "}
                  </p>
                </div>
              </div>
              <div className="bg-white shadow-xl w-[100%] md:w-[23%] min-h-[400px] flex flex-col justify-center items-center text-center rounded-2xl mr-2 mb-2">
                <div className="bg-[#3EBF87] mt-4 w-24 h-24 rounded-full flex justify-center items-center p-4">
                  <img
                    className="w-full h-full object-contain"
                    src={people}
                    alt="awards"
                  />
                </div>
                <div className="m-1">
                  <h3 className="text-[#3EBF87] font-bold text-lg">
                    {" "}
                    {translations[language]?.friends}{" "}
                  </h3>
                  <p className="text-[#3EBF87] font-inter font-bold text-base">
                    {" "}
                    {translations[language]?.friendParagraph}{" "}
                  </p>
                </div>
              </div>
              <div className="bg-white shadow-xl w-[100%] md:w-[23%] min-h-[400px] flex flex-col justify-center items-center text-center rounded-2xl mr-2 mb-2">
                <div className="bg-[#3EBF87] mt-4 w-24 h-24 rounded-full flex justify-center items-center p-4">
                  <img
                    className="w-full h-full object-contain"
                    src={delivery}
                    alt="awards"
                  />
                </div>
                <div className="m-1">
                  <h3 className="text-[#3EBF87] font-bold text-lg">
                    {" "}
                    {translations[language]?.Fastshipping}{" "}
                  </h3>
                  <p className="text-[#3EBF87] font-inter font-bold text-base">
                    {" "}
                    {translations[language]?.offer}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default About;
