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
      <div className="bg-[#3EBF87] text-white w-full py-3 text-center bottom-0">
        <div className="  ">
          <div
            className={`flex flex-col lg:flex-row gap-4 lg:gap-1 justify-between w-[100%] lg:w-[95%] mx-auto ${
              direction === "rtl" ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="px-3 lg:px-0 text-start w-full lg:w-[50%]">
              <div className=" capitalize flex flex-col py-1">
                <h1 className="text-xl">{translations[language]?.important}</h1>
                <div className="flex flex-col  ml-3">
                  <Link className="text-white no-underline">
                    {translations[language]?.privacy}{" "}
                  </Link>
                  <Link className="text-white no-underline">
                    {translations[language]?.cookies}{" "}
                  </Link>
                  <Link className="text-white no-underline">
                    {translations[language]?.terms}{" "}
                  </Link>
                </div>
              </div>
              <div className="">
                <h1 className="text-white text-xl">
                  {translations[language]?.information}
                </h1>
                <p className="text-white lg:w-[70%]  ml-3 text-left">
                  {translations[language]?.pfooter}
                </p>
              </div>
            </div>
            <div className="px-3 lg:px-0 w-full lg:w-[50%] text-start">
              <div className="">
                <h2 className="text-xl ">
                  {translations[language]?.contactdetails}
                </h2>
                <p className="text-white text-left lg:w-[80%]">
                  {translations[language]?.require}
                </p>
              </div>
              <div className="address">
                <div className="flex flex-row my-1">
                  <img src={address} className="w-[30px] h-[30px]" alt="" />
                  <h2 className="items-baseline font-bold text-2xl my-auto">
                    {translations[language]?.addresscontact}
                  </h2>
                </div>
                <p className="text-white text-left w-[100%] lg:w-[90%] mx-auto">
                  {translations[language]?.addfooterone} <br />
                  {translations[language]?.addfootertwo}
                </p>
              </div>
              <div className="flex flex-col lg:flex-row gap-[50px] w-[100%] lg:w-[90%]">
                <div className="address lg:w-[40%]">
                  <div className="flex flex-row my-2 ">
                    <img src={phone} className="w-[30px] h-[30px]" />
                    <h2 className="items-baseline font-bold text-2xl my-auto capitalize">
                      {translations[language]?.phonenumber}:
                    </h2>
                  </div>
                  <h2 className="text-center">00212689831227</h2>
                </div>
                <div className="address lg:w-[40%]">
                  <div className="flex flex-row my-2 ">
                    <img src={email} className="w-[30px] h-[30px]" />
                    <h2 className="items-baseline font-bold text-2xl my-auto">
                      {translations[language]?.email}:
                    </h2>
                  </div>
                  <h2 className="text-center text-xl ">
                    contact@vitaparapharma.com
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-[#70CCDA] font-bold">
        Copyright © 2023 ET VITAPARA | Propulsé par ET VITAPARA
      </div>
    </>
  );
}
export default Footer;
