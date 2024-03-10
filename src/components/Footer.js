import React from "react";
import { useSelector } from "react-redux";
import {
  selectLanguage,
  selectTranslations,
  setLanguage,
} from "../rtk/slices/Translate-slice";
import email from ".././images/Email icon.png";
import address from ".././images/Location icon.png";
import phone from ".././images/phone icon.png";
import { Link } from "react-router-dom";

function Footer() {
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const direction = language === "ar" ? "rtl" : "ltr"; // Determine language direction

  return (
    <>
      <div className="bg-[#3EBF87] text-white p-3 text-center bottom-0">
        <div className=" header-container ">
          <div
            className={`flex flex-col lg:flex-row gap-3 ${
              direction === "rtl" ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="cartfooter text-start">
              <div className="important">
                <h1>{translations[language]?.important}</h1>
                <Link className="footerlink">
                  {translations[language]?.privacy}{" "}
                </Link>
                <Link className="footerlink">
                  {translations[language]?.cookies}{" "}
                </Link>
                <Link className="footerlink">
                  {translations[language]?.terms}{" "}
                </Link>
              </div>
              <div className="information">
                <h1>{translations[language]?.information}</h1>
                <h2>{translations[language]?.pfooter}</h2>
              </div>
            </div>
            <div className="cartfooter cartfootertwo text-start">
              <div className="important">
                <h1>{translations[language]?.contactdetails}</h1>
                <h2>{translations[language]?.require}</h2>
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
    </>
  );
}
export default Footer;
