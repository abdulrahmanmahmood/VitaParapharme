import "./changepassword.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
import WhatsAppIcon from "../components/Whatsapp";
import Footer from "../components/Footer";
import "./privacypolicy.css";

function PrivacyPolicy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translations = useSelector(selectTranslations);
  const language = useSelector(selectLanguage);
  const direction = useSelector((state) => state.translation.direction);

  const [searchTerm, setSearchTerm] = useState("");
  const allProducts = useSelector((state) => state.products);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
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

      <div className="bg-gray-50 bottom-0 overflow-y-hidden mt-[150px]">
        <div className="mt-3 relative top-12 lg:top-0 lg:mx-12 overflow-y-hidden md:px-5  sm:px-2">
          <div className="">
            <WhatsAppIcon />
            <div
              className={`mb-5  ${
                direction === "rtl" ? "rtl" : "ltr"
              } leading-3`}
            >
              <h2 className="p-1">{translations[language]?.termsand}</h2>
              <h6 className="p-1">{translations[language]?.welcometo}</h6>
              <h6 className="p-1">{translations[language]?.adjust}</h6>
              <h6 className="p-1">{translations[language]?.assume}</h6>
              <h6 className="p-1">{translations[language]?.definition}</h6>
              <h6 className="p-1">{translations[language]?.accessing}</h6>
              <h6 className="p-1">{translations[language]?.most}</h6>
              <h6 className="p-1">{translations[language]?.license}</h6>
              <h6 className="p-1">{translations[language]?.mustnot}</h6>
              <h6 className="p-1">{translations[language]?.repuplish}</h6>
              <h6 className="p-1">{translations[language]?.sell}</h6>
              <h6 className="p-1">{translations[language]?.repro}</h6>
              <h6 className="p-1">{translations[language]?.distribute}</h6>
              <h6 className="p-1"> {translations[language]?.agreement}</h6>
              <h6 className="p-1">{translations[language]?.avail}</h6>
              <h6 className="p-1">{translations[language]?.reserve}</h6>
              <h6 className="p-1">{translations[language]?.you}</h6>
              <h6 className="p-1">{translations[language]?.comment}</h6>
              <h6 className="p-1">{translations[language]?.les}</h6>
              <h6 className="p-1">{translations[language]?.lestwo}</h6>
              <h6 className="p-1">{translations[language]?.grant}</h6>
              <h6 className="p-1">{translations[language]?.hyper}</h6>
              <h6 className="p-1">{translations[language]?.may}</h6>
              <h6 className="p-1">{translations[language]?.agenc}</h6>
              <h6 className="p-1">{translations[language]?.search}</h6>
              <h6 className="p-1">{translations[language]?.press}</h6>
              <h6 className="p-1">{translations[language]?.online}</h6>
              <h6 className="p-1">{translations[language]?.Systematic}</h6>
              <h6 className="p-1">{translations[language]?.these}</h6>
              <h6 className="p-1">{translations[language]?.cons}</h6>
              <h6 className="p-1">{translations[language]?.know}</h6>
              <h6 className="p-1">{translations[language]?.dotcom}</h6>
              <h6 className="p-1">{translations[language]?.group}</h6>
              <h6 className="p-1">{translations[language]?.electronic}</h6>
              <h6 className="p-1">{translations[language]?.portals}</h6>
              <h6 className="p-1">{translations[language]?.account}</h6>
              <h6 className="p-1">{translations[language]?.education}</h6>
              <h6 className="p-1">{translations[language]?.approve}</h6>
              <h6 className="p-1">{translations[language]?.long}</h6>
              <h6 className="p-1">{translations[language]?.among}</h6>
              <h6 className="p-1">{translations[language]?.maytwo}</h6>
              <h6 className="p-1"> {translations[language]?.using}</h6>
              <h6 className="p-1">
                {translations[language]?.frame} <br></br>
                {translations[language]?.without}
              </h6>
              <h6>
                {translations[language]?.content} <br></br>
                {translations[language]?.take}
              </h6>
              <h6>
                {translations[language]?.right} <br></br>
                {translations[language]?.request}
              </h6>
              <h6>
                {" "}
                {translations[language]?.remove} <br></br>
                {translations[language]?.find}
              </h6>
              <h6>{translations[language]?.acc}</h6>
              <h6>
                {translations[language]?.disc} <br></br>
                {translations[language]?.max}
              </h6>
              <h6>{translations[language]?.limitation}</h6>
              <h6>{translations[language]?.site}</h6>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default PrivacyPolicy;
