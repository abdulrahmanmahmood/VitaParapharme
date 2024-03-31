import NavHeader from "../components/NavHeader";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../rtk/slices/Search-slice";
import { useLocation, useNavigate } from "react-router-dom";
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
import { baseUrl, baseUrl2 } from "../rtk/slices/Product-slice";

export function formatDate(dateString) {
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

  const year = date.getFullYear().toString().slice(-2); // Get last two digits of year

  return formattedDate.replace(String(day), formattedDay);
}


function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const bearerToken = useSelector(selectToken);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const direction = useSelector((state) => state.translation.direction);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${baseUrl2}/user/order/all`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      });

      console.log("the orders >>", response.data.data);
      setAllOrders(response.data.data.orders);
    } catch (error) {
      console.error("error in fetching All Orders", error);
    }
  };

  const handleDetailsClick = (index) => {
    setSelectedOrderIndex(index === selectedOrderIndex ? null : index);
    setShowDetails(index === selectedOrderIndex ? !showDetails : true);
  };


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SelectedOrder = Number(queryParams.get("orderId")) || null;
  console.log("SelectedOrder", SelectedOrder);

  return (
    <div>
      <div className="">
        <NavHeader />

        <div className="bg-gray-50 bottom-0 overflow-y-hidden mt-[150px] ">
          <div className="mt-3 lg:mx-12 md:px-5 sm:px-2 mb-[15em]">
            <WhatsAppIcon />
            <div className="mb-6 flex flex-col lg:flex-row mt-[20px]">
              <h5 className="text-black text-6xl my-2 font-interTight p-1 ">
                {translations[language]?.myorder}
              </h5>
              <p
                className={`lg:w-[300px] max-md:px-2 mt-auto  font-medium items-baseline  ${
                  direction === "rtl"
                    ? "rtl text-right lg:mr-4"
                    : "ltr text-left lg:ml-4"
                } `}
              >
                {translations[language]?.myorderText}
              </p>
            </div>
            <div className="mx-auto">
              {allOrders
                ?.sort((a, b) => a.orderId - b.orderId)
                .map((order, index) => (
                  <div
                    className={`p-1 text-[#3EBF87] font-inter text-lg font-bold   ${
                      SelectedOrder &&
                      (SelectedOrder === order.orderId
                        ? "border-3 border-green-400 "
                        : "")
                    } border-2 rounded mb-4 `}
                    key={index}
                  >
                    <div className="flex flex-col max-md:gap-2 lg:flex-row  justify-between   my-3">
                      <div className="p-3 max-lg:mb-[20px] bg-[#88C897] text-light rounded-3xl text-nowrap overflow-x-visible max-md:text-[15px] md:text-[20px] ">
                        Order# #{order.orderId}
                      </div>
                      <div className="">
                        {translations[language]?.orderplaced}:{" "}
                        {formatDate(order.orderDate)}
                      </div>
                      <div className="text-nowrap  overflow-x-visible">
                        {translations[language]?.totalorder}:{" "}
                        {order.totalAmount} $
                      </div>
                      <div className="text-nowrap overflow-x-visible max-md:text-[13px] md:text-[17px]">
                        {translations[language]?.orderstatus}:{" "}
                        {order.orderStatus}
                      </div>
                      <div
                        className=" text-center cursor-pointer text-nowrap overflow-x-visible max-md:text-[13px] md:text-[17px] my-auto"
                        onClick={() => handleDetailsClick(index)}
                      >
                        {selectedOrderIndex === index && showDetails
                          ? translations[language]?.hide
                          : translations[language]?.show}
                      </div>
                    </div>

                    {selectedOrderIndex === index && showDetails && (
                      <div className="m-3">
                        <div className="border border-gray-300">
                          <div className="p-3 border-b border-gray-300">
                            <div className="grid grid-cols-4 gap-2">
                              <div className="max-md:text-[10px]  lg:font-bold">
                                {translations[language]?.product}
                              </div>
                              <div className="max-md:text-[10px]  lg:font-bold">
                                {translations[language]?.quantity}
                              </div>
                              <div className="max-md:text-[10px]  lg:font-bold">
                                {translations[language]?.unit}
                              </div>
                              <div className="max-md:text-[10px]  lg:font-bold">
                                {translations[language]?.total}
                              </div>
                            </div>
                          </div>
                          {order?.orderItems?.map((item, itemIndex) => (
                            <div
                              className="p-3 border-b border-gray-300"
                              key={itemIndex}
                            >
                              <div className="grid grid-cols-4 gap-2">
                                <div>
                                  <img
                                    src={item.pictureUrl}
                                    alt=""
                                    className="w-16 h-16 object-cover"
                                  />
                                  <div className="max-md:text-[10px] max-lg:text-[13px] lg:text-[20px] ">
                                    {item.productName}
                                  </div>
                                </div>
                                <div className="ml-7">{item.quantity}</div>
                                <div className="ml-7">${item.unitPrice}</div>
                                <div className="ml-7">${item.totalPrice}</div>
                              </div>
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
