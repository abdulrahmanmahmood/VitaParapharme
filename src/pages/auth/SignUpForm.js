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
import { baseUrl, baseUrl2 } from "../../rtk/slices/Product-slice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm = ({ showPassword, handleTogglePasswordVisibility }) => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const direction = useSelector((state) => state.translation.direction);

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const handleRegister = () => {
    axios
      .post(`${baseUrl2}/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      })
      .then((result) => {
        console.log("Token type:", typeof result.data.data.token); // Add this line for debugging

        console.log("Result data:", result.data);
        console.log("Result data:", result.data.message);

        dispatch(setToken(result.data.data.token));

        setRegistrationMessage(result.data.message);
        localStorage.setItem("token", JSON.stringify(result.data.data.token)); // Store token directly
        localStorage.setItem("email", formData.email); // Store token directly
        navigate("/validate")
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
          console.log(err);
        }
      })
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
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}/.test(
        formData.password
      )
    ) {
      isValid = false;
      validationErrors.password =
        "Password must contain at least one lowercase character, one uppercase character, one special character, one number, and be at least 8 characters long";
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
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={(event) =>
                  handleInputChange("password", event.target.value)
                }
              />
            </div>
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
