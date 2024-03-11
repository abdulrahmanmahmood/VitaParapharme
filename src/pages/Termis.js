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

function Terms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translations = useSelector(selectTranslations);
  const language = useSelector(selectLanguage);

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
            <div className="mb-5 w-[90%] mx-auto">
              <h4>{translations[language]?.termsand}</h4>
              <h6 className="font-normal">{translations[language]?.draft}</h6>
              <h4>{translations[language]?.privacy}</h4>
              <h6 className="font-normal">{translations[language]?.create}</h6>
              <h4>{translations[language]?.payment}</h4>
              <h6 className="font-normal">{translations[language]?.handle}</h6>
              <h4>{translations[language]?.electronic}</h4>
              <h6 className="font-normal">{translations[language]?.your}</h6>
              <h4>{translations[language]?.protec}</h4>
              <h6 className="font-normal">{translations[language]?.ensure}</h6>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Terms;
