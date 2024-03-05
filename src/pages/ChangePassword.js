import "./changepassword.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../rtk/slices/Auth-slice";
import Footer from "../components/Footer";
import axios from "axios";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import NavHeader from "../components/NavHeader";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { Link } from "react-router-dom";
import { baseUrl } from "../rtk/slices/Product-slice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const bearerToken = useSelector(selectToken);

  const handleSaveClick = async () => {
    try {
      const apiUrl = `${baseUrl}/profile/password/update`;

      const headers = {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      };

      const response = await axios.put(
        apiUrl,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        { headers }
      );

      if (response.data && response.data.success) {
        console.log("Password updated successfully");

        setNewPassword("");
        setCurrentPassword("");
      } else {
        console.error("Failed to update password:", response.data);
      }
    } catch (error) {
      console.error("Error updating password:", error);
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

      <div className="bg-gray-50 bottom-0 overflow-y-hidden ">
        <div className="mb-20 relative top-12 lg:top-0 lg:mx-12 overflow-y-hidden md:px-5 sm:px-2">
          <div className="mt-6 ">
            <h2 className="text-xlg">{translations[language]?.change}</h2>
            <h6 className="text-md">{translations[language]?.choose}</h6>
            <h6 className="text-md">{translations[language]?.changing}</h6>
          </div>
          <div className="mt-10 mx-auto w-72 flex flex-col">
            <input
              className="bg-transparent border border-grey rounded-md px-3 py-2 mt-5 text-black focus:outline-none"
              type="password"
              name="newPassword"
              placeholder={translations[language]?.newpass}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              className="bg-transparent border border-grey rounded-md px-3 py-2 mt-3 text-black focus:outline-none"
              type="password"
              name="currentPassword"
              placeholder={translations[language]?.oldpass}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <div className=" justify-around  mt-10 mx-auto w-72 flex flex-row">
              <button
                className="text-black font-bold bg-[#3EBF87] px-3 py-2 rounded-lg "
                onClick={handleSaveClick}
              >
                {translations[language]?.save}
              </button>
              <button className="text-black font-bold">
                {translations[language]?.cancel}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ChangePassword;
