/*import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { setLanguage , selectLanguage , selectTranslations } from '../../rtk/slices/Translate-slice';
import './sign.css';

const SignUpForm = ({ showPassword, handleTogglePasswordVisibility }) => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',

  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  }, [language]);


  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = () => {
    axios.post('https://mostafaben.bsite.net/api/Users/register', formData)
      .then(result => {
        localStorage.setItem('token', result.data.token);
        navigate('/home');
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};


    
    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.email = "Email required; "
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Email is not valid; "
    }

    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "password required; "
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.password = "password length at least 6 char; "
    }
    if (formData.confirmPassword !== formData.password) {
      isvalid = false;
      validationErrors.confirmPassword = "c password not match; "
    }

    setErrors(validationErrors);
    setValid(isvalid);

    if (isvalid) {
      handleRegister();
    }
  };

  return (
    <>
      <form action="#" className="sign-up-form" onSubmit={handleSubmit}>

       
        <div className="row">
          <div className="mb-3 col-md-12">
            <label>
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(event) => handleInputChange("email", event.target.value)}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3 col-md-12">
            <label>
              Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(event) => handleInputChange("password", event.target.value)}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <div className="mb-3 col-md-12">
            <label>
              Confirm Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              placeholder="Confirm Password"
              onChange={(event) => handleInputChange("confirmPassword", event.target.value)}
            />
            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
          </div>
        </div>
       

        <input type="submit" className="signbtn" value={translations[language]?.login} />
      </form>
    </>
  );
};

export default SignUpForm;*/

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import "./sign.css";
import { setToken } from "../../rtk/slices/Auth-slice";
import { baseUrl } from "../../rtk/slices/Product-slice";

const SignUpForm = ({ showPassword, handleTogglePasswordVisibility }) => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
  const [registrationMessage, setRegistrationMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = () => {
    axios
      .post(`${baseUrl}/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      })
      .then((result) => {
        console.log("Result data:", result.data);
        console.log("Result data:", result.data.message);

        dispatch(setToken(result.data.data.token));

        setRegistrationMessage(result.data.message);
        localStorage.setItem("token", result.data.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.success === false
        ) {
          const errorMessage = err.response.data.message;

          // Check if the error message indicates that the email or phone already exists
          if (errorMessage.includes("email")) {
            setErrors({
              registration:
                "This email already exists. Please choose a different one.",
            });
          } else if (errorMessage.includes("phone")) {
            setErrors({
              registration:
                "This phone number already exists. Please choose a different one.",
            });
          } else {
            setErrors({ registration: errorMessage });
          }
        } else {
          console.error(err);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (formData.email === "" || formData.email === null) {
      isValid = false;
      validationErrors.email = "Email required; ";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email is not valid; ";
    }

    if (formData.password === "" || formData.password === null) {
      isValid = false;
      validationErrors.password = "Password required; ";
    } else if (formData.password.length < 3) {
      isValid = false;
      validationErrors.password =
        "Password length should be at least 6 characters; ";
    }

    if (formData.phone === "" || formData.phone === null) {
      isValid = false;
      validationErrors.phone = "Phone number required; ";
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      handleRegister();
    }
  };

  return (
    <>
      {registrationMessage && (
        <p className="text-success">{registrationMessage}</p>
      )}
      <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
        {errors.registration && (
          <p className="text-danger">{errors.registration}</p>
        )}

        <div className="row">
          <div className="mb-3 col-md-12">
            <label>
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
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
            <input
              type="password"
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
          <div className="mb-3 col-md-12">
            <label>
              Phone<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              onChange={(event) =>
                handleInputChange("phone", event.target.value)
              }
            />
            {errors.phone && (
              <span className="text-danger">{errors.phone}</span>
            )}
          </div>
        </div>
        <input type="submit" className="signbtn" value="sign up" />
      </form>
    </>
  );
};

export default SignUpForm;
