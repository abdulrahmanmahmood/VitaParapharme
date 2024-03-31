import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import { setAuthData } from "../../rtk/slices/Auth-slice";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { setToken } from "../../rtk/slices/Auth-slice";
import { setEmail } from "../../rtk/slices/Auth-slice";
import { useEffect } from "react";
import { baseUrl, baseUrl2 } from "../../rtk/slices/Product-slice";
import "./sign.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    rememberMe: false, // Initialize rememberMe as false by default
  });
  const [valid, setValid] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };

  const handleUserLogin = () => {
    setLoading(true);
    const isEmail = formData.email.includes("@");
    const requestBody = {
      email: isEmail ? formData.email : "",
      phone: isEmail ? "" : formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe, // Use the value of formData.rememberMe
    };

    axios
      .post(`${baseUrl2}/auth/login`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      })
      .then((result) => {
        setRegistrationMessage("");
        console.log(result.data);
        dispatch(setToken(result.data.data.token));
        dispatch(setEmail(result.data.data.email));

        const expirationTime = formData.rememberMe
          ? Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days for rememberMe true // 1 minute for rememberMe false
          : Date.now() + 24 * 60 * 60 * 1000;
        console.log(
          "Token Expiration Time:",
          new Date(expirationTime).toLocaleString()
        );
        localStorage.setItem(
          "token",
          JSON.stringify({
            value: result.data.data.token,
            expires: expirationTime,
          })
        );
        localStorage.setItem(
          "email",
          JSON.stringify({
            value: result.data.data.email,
            expires: expirationTime,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setRegistrationMessage(err.response.data.message);
        } else {
          setRegistrationMessage("An error occurred during login.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (
      (formData.email === "" && formData.phone === "") ||
      (formData.email === null && formData.phone === null)
    ) {
      isValid = false;
      validationErrors.email = "Email or Phone required; ";
    }

    if (formData.password === "" || formData.password === null) {
      isValid = false;
      validationErrors.password = "Password required; ";
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      handleUserLogin();
    }
  };

  const handleRememberMeChange = (e) => {
    setFormData({ ...formData, rememberMe: e.target.checked });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="signincont">
        {registrationMessage && (
          <p className="text-danger">{registrationMessage}</p>
        )}
        <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
          <div className="mb-3 col-md-12">
            <label>
              Email or Phone<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="emailOrPhone"
              className="form-control"
              placeholder="Enter Email or Phone"
              autoComplete="off"
              onChange={(event) =>
                handleInputChange("email", event.target.value)
              }
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3 col-md-12">
            <label>
              Password<span className="text-danger">*</span>
            </label>
            <button
              type="button"
              className="toggle-password-btn ml-3 mt-0"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FaEyeSlash className="text-[20px]" />
              ) : (
                <FaEye className="text-[20px]" />
              )}
            </button>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <div className="flex flex-row-reverse justify-between my-3 gap-3 items-baseline text-[20px]">
            <label htmlFor="remember">Remember me</label>
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="w-[20px] h-[20px]"
              onChange={handleRememberMeChange}
            />
          </div>
          <input
            type="submit"
            className="signbtn"
            value={translations[language]?.login}
          />
        </form>
      </div>
      {loading && (
        <div
          className="loading-spinner"
          style={{ width: "50px", height: "50px", marginTop: "10px" }}
        ></div>
      )}
    </>
  );
};

export default SignInForm;
