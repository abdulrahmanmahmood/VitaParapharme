import React, { useState, useEffect } from "react";
import emaill from "../../images/email 1.png";
import logo from "../../images/Vita Logo2.png";
import { useSelector } from "react-redux";
import {
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Validate = () => {
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, send the verification code to the API endpoint
    const formData = {
      email: email, // Provide the email here
      code: verificationCode.join(""), // Combine the verification code digits
    };
    console.log("data sending is ",formData);

    axios
      .post("https://api.vitaparapharma.com/p/activate-account", formData)
      .then((response) => {
        // Handle success
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        setRegistrationMessage(error.response.data.message); // Set error message
      });
  };

  // Function to focus on the next input
  const focusNextInput = (index) => {
    if (index < 5) {
      document.getElementById(`code-${index + 2}`).focus();
    }
  };

  // Function to handle input change
  const handleInputChange = (index, value) => {
    const updatedVerificationCode = [...verificationCode];
    updatedVerificationCode[index] = value;
    setVerificationCode(updatedVerificationCode);
    if (value !== "") {
      focusNextInput(index);
    }
    console.log(verificationCode);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="w-full h-[100vh]">
      <div className="flex flex-col lg:flex-row w-full lg:h-full border-2  ">
        <div className="bg-[#3EBF87] w-[100%] lg:w-[40%]  lg:h-[100%] lg:rounded-r-[200px]   max-md:rounded-b-full">
          <img src={emaill} className="w-10/12 h-[65%] mx-auto mt-[14%] " />
        </div>
        <div className="bg-white w-[100%] lg:w-[60%] h-[100%] mx-auto my-auto text-center items-center">
          <img src={logo} className="w-[230px] h-[120px] mx-auto mt-[20%]" />
          <div className="text-center">
            <h2>{translations[language]?.pleaseVeriry}</h2>
            <p>{translations[language]?.EnterDigits}</p>
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="w-[90%] mx-auto mb-[100px] lg:mb-0"
          >
            <div className=" w-[100%] space-x-3 lg:space-x-10 items-center justify-center flex flex-row mt-[30px] ">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  id={`code-${index}`}
                  className="w-[70px] h-[70px] lg:h-[90px] bg-[#F3F3F3] text-center border-[#707070] border-2 rounded-md text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  value={verificationCode[index - 1]}
                  onChange={(e) => handleInputChange(index - 1, e.target.value)}
                  required
                />
              ))}
            </div>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500"
            >
              Please introduce the 6-digit code we sent via email.
            </p>
            {registrationMessage && (
              <p className="text-red-500">{registrationMessage}</p>
            )}
            <button
              type="submit"
              className="bg-[#3EBF87] text-white font-semibold py-3 px-4 rounded-lg mt-4 inline-block hover:bg-primary-600 transition duration-300"
            >
              {translations[language]?.Verify}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Validate;
