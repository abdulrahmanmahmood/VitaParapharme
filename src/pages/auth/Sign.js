import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import { useEffect } from "react";
import "./sign.css";

const Sign = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const direction = useSelector((state) => state.translation.direction);

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {}, [language]);

  const toggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  return (
    <div className={`containersign ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* <div className={`flexLanguage  ${direction === "rtl" ? "rtl" : "ltr"}`}>
        <div className="languageInnav rightAlign ">
          <select
            className="bg-[#61DAA2] border border-white border-opacity-50 outline-none text-white flex items-center mr-28 ml-20"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="fr">Française</option>
            <option value="ar">لغه عربيه</option>
          </select>
        </div>
      </div> */}

          {isSignUpMode ? (
            <SignUpForm
              showPassword={showPassword}
              handleTogglePasswordVisibility={handleTogglePasswordVisibility}
            />
          ) : (
            <SignInForm
              showPassword={showPassword}
              handleTogglePasswordVisibility={handleTogglePasswordVisibility}
            />
          )}
        </div>
      </div>

      <div className="panels-container">
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>{translations[language]?.newhere}</h3>
              <h3>{translations[language]?.welcome}</h3>
              <button
                className="signbtn transparent"
                id="sign-up-btn"
                onClick={toggleMode}
              >
                {translations[language]?.register}
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>{translations[language]?.oneofus}</h3>
              <h3>{translations[language]?.welcome}</h3>
              <button
                className="signbtn transparent"
                id="sign-in-btn"
                onClick={toggleMode}
              >
                {translations[language]?.register}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
