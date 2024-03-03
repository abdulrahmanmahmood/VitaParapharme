import NavHeader from "../components/NavHeader";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../rtk/slices/Search-slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import "./myorder.css";
import axios from "axios";
import { selectToken } from "../rtk/slices/Auth-slice";
import { AiTwotoneDelete } from "react-icons/ai";
import WhatsAppIcon from "../components/Whatsapp";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { baseUrl } from "../rtk/slices/Product-slice";

function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const bearerToken = useSelector(selectToken);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/user/order/all`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Accept-Language': language,
          },
        }
      );

      console.log("the orders >>", response.data.data);
      setAllOrders(response.data.data.orders);
    } catch (error) {
      console.log("error in fetching All Orders", error);
    }
  };

  const handleDetailsClick = (index) => {
    setSelectedOrderIndex(index === selectedOrderIndex ? null : index);
    setShowDetails(index === selectedOrderIndex ? !showDetails : true);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();
  
    const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const formattedDay = `${day}${ordinalSuffix(day)}`;
  
    return formattedDate.replace(String(day), formattedDay);
  }


  return (
    <div>
      <div className="page-container">
        <NavHeader />

        <div className="green-containerr">
          <div className="home-containerr home-order testtt">
            <WhatsAppIcon />
            <div className="myprdersParagraph  ">
              <h1 className="text-white d-flex">{translations[language]?.myorder}</h1>
              <span className="text-white d-flex">
              {translations[language]?.view}
              </span>
            </div>
            <div className="myOrders mx-auto my-auto">
              {allOrders?.map((order, index) => (
                <div
                  className="orderInfo container border border-2 rounding align-items-center "
                  key={index}
                >
                  <div className="row negative-padding gap-1">
                    <div className="col bg-success rounded rounded-5 text-light text-center align-items-center p-3 ">
                      Order#{" "}
                      <span className="ms-3 fs-5 mx-auto col">
                        {order.zipCode}
                      </span>
                    </div>
                    <div className="col my-auto ">
                    {translations[language]?.orderplaced} : <span>{formatDate(order.orderDate)}</span>
                    </div>
                    <div className="col my-auto">
                    {translations[language]?.totalorder} : {order.totalAmount} $
                    </div>
                    <div className="col my-auto">
                    {translations[language]?.orderstatus} : <span >{order.orderStatus}</span>
                    </div>
                    <div
                      className="col  my-auto mr-auto"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDetailsClick(index)}
                    >
                      {selectedOrderIndex === index && showDetails
                        ? translations[language]?.hide
                        : translations[language]?.show}
                    </div>
                  </div>

                  {selectedOrderIndex === index && showDetails && (
                    <div className="m-5 border-top border-bottom d-hidden negative-padding">
                      <div className="container">
                        <div className="row negative-padding">
                          <div className="col">
                            <h3 className="h-product">{translations[language]?.product}</h3>
                          </div>
                          <div className="col">
                            <h3 className="h-product">{translations[language]?.quantity}</h3>
                          </div>
                          <div className="col">
                            <h3 className="h-product">{translations[language]?.unit}</h3>
                          </div>
                          <div className="col">
                            <h3 className="h-product">{translations[language]?.total}</h3>
                          </div>

                        </div>
                        {order?.orderItems?.map((item, itemIndex) => (
                          <div className="row" key={itemIndex}>
                            <div className="col ">
                              <img
                                src={item.pictureUrl}
                                alt=""
                                className="product-img "
                              />
                              <div className="">{item.productName}</div>
                            </div>
                            <div className="col">{item.quantity}</div>
                            <div className="col">${item.unitPrice}</div>
                            <div className="col">${item.totalPrice}</div>
                            
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
export default MyOrders;