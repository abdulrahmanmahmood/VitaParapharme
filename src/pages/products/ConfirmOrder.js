import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../../images/Vita Logo2.png";
import { FaTrash } from "react-icons/fa";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";
import product from "../../images/product.png";
import NavHeader from "../../components/NavHeader";
import axios from "axios";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { Modal } from "react-bootstrap";
import "./confirmOrder.css";
import WhatsAppIcon from "../../components/Whatsapp";
import email from "../../images/Email icon.png";
import addresss from "../../images/Location icon.png";
import phone from "../../images/phone icon.png";
import Footer from "../../components/Footer";
import { baseUrl } from "../../rtk/slices/Product-slice";

function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const bearerToken = useSelector(selectToken);
  const [countries, setCountries] = useState([]);
  const [newAddress, setNewAddress] = useState({
    country: "MOROCCO",
    city: "",
    region: "",
    street: "",
    zipCode: "",
  });
  const [formError, setFormError] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUserAddresses();
    getCounries();
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const totalprice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const allProducts = useSelector((state) => state.products);
  const cartProducts = useSelector((state) => state.cart);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    region: "",
    postalCode: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [address, setAdress] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/address/all`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });
      // console.log("addreses", response.data);
      setAdress(response.data.data.addresses);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const createOrder = async (addressId) => {
    try {
      const response = await axios.post(
        `${baseUrl}/user/order/cart/on/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
          },
        }
      );

      if (response.status === 200) {
        setModalMessage("Order submitted successfully");
        setShowModal(true);
      } else {
        console.log("Error submitting order:", response.data);

        if (response.data && response.data.message) {
          navigate("/order");
        } else {
          console.error("Unknown error:", response.data);
        }
      }
      console.log("addressid ", addressId);
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log("addressid ", addressId);
    }
  };

  const handleSubmit = async (addressId) => {
    createOrder(addressId);
    console.log(addressId);
  };

  const addNewAddress = async () => {
    if (
      newAddress.city === "" ||
      newAddress.region === "" ||
      newAddress.street === "" ||
      newAddress.zipCode === ""
    ) {
      setFormError("Please fill in all required fields.");
      return; // Don't proceed with adding the address
    }

    try {
      const response = await axios.post(
        `${baseUrl}/user/address/new`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
          },
        }
      );
      console.log("adding new address successfully", response.data);
      fetchUserAddresses();
      setNewAddress({
        country: "MOROCCO",
        city: "",
        region: "",
        street: "",
        zipCode: "",
      });
      setShowForm(false);
    } catch (error) {
      console.log("error in add newAddress >>", error);
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;

    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [fieldName]: value,
    }));

    console.log(newAddress);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/user/address/delete/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
          },
        }
      );
      console.log("Deleted address successfully", response.data);
      fetchUserAddresses();
    } catch (error) {
      console.log("error in Delete Address >>", error);
    }
  };

  const getCounries = async () => {
    try {
      const response = await axios.get(`${baseUrl}/public/country/all`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });
      console.log("countries>>", response.data.data.countries);
      setCountries(response.data.data.countries);
    } catch (error) {
      console.log("error in getting countries", error.message);
    }
  };

  return (
    <div className="confirmPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <Container style={{ marginTop: "200px" }}>
        <div className=" testtt">
          <WhatsAppIcon />

          <div>
            {address.length > 4 ? <h3>Max addresses 5</h3> : null}

            {address.length < 5 && (
              <div className="lg:w-[70%] w-[95%] border-1 px-10 mx-auto pt-10 pb-5 rounded-3xl shadow-slate-400 shadow-md mt-4">
                <div className="">
                  <h5 className="text-center text-[#3EBF87] text-2xl">
                    Add New Address
                  </h5>
                  <div className="relative mb-3 p-3">
                    <label
                      htmlFor="country"
                      className="form-label absolute top-3 left-20 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[#3EBF87] text-2xl capitalize"
                    >
                      {translations[language]?.country}
                    </label>
                    <select
                      className="form-select ring-1 ring-[#3EBF87] ring-offset-4 ring-offset-white"
                      id="country"
                      aria-label="Default select example"
                      onChange={(e) => handleInputChange(e, "country")}
                      value={"MOROCCO"}
                    >
                      <option value="MOROCCO" key={"MOROCCO"}>
                        Morocco
                      </option>
                      {/* {Object.keys(countries).map((countryKey) => (
          <option
            key={countryKey}
            value={countries[countryKey]}
          >
            {countries[countryKey]}
          </option>
        ))} */}
                    </select>
                  </div>

                  <div className="relative mb-3 p-3">
                    <label
                      htmlFor="city"
                      className="form-label absolute top-3 left-20 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[#3EBF87] text-2xl capitalize"
                    >
                      {translations[language]?.city}
                    </label>
                    <input
                      type="text"
                      className="form-control ring-1 ring-[#3EBF87] ring-offset-4 ring-offset-white"
                      id="city"
                      onChange={(e) => handleInputChange(e, "city")}
                      value={newAddress.city}
                    />
                  </div>

                  <div className="relative mb-3 p-3">
                    <label
                      htmlFor="region"
                      className="form-label absolute top-3 left-20 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[#3EBF87] text-2xl capitalize"
                    >
                      {translations[language]?.region}
                    </label>
                    <input
                      type="text"
                      className="form-control ring-1 ring-[#3EBF87] ring-offset-4 ring-offset-white"
                      id="region"
                      onChange={(e) => handleInputChange(e, "region")}
                      value={newAddress.region}
                    />
                  </div>

                  <div className="relative mb-3 p-3">
                    <label
                      htmlFor="street"
                      className="form-label absolute top-3 left-20 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[#3EBF87] text-2xl capitalize"
                    >
                      {translations[language]?.street}
                    </label>
                    <input
                      type="text"
                      className="form-control ring-1 ring-[#3EBF87] ring-offset-4 ring-offset-white"
                      id="street"
                      onChange={(e) => handleInputChange(e, "street")}
                      value={newAddress.street}
                    />
                  </div>

                  <div className="relative mb-3 p-3">
                    <label
                      htmlFor="zipCode"
                      className="form-label absolute top-3 left-20 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[#3EBF87] text-2xl capitalize"
                    >
                      {translations[language]?.zipcode}
                    </label>
                    <input
                      type="text"
                      className="form-control ring-1 ring-[#3EBF87] ring-offset-4 ring-offset-white"
                      id="zipCode"
                      onChange={(e) => handleInputChange(e, "zipCode")}
                      value={newAddress.zipCode}
                    />
                  </div>
                  {formError && <p className="text-red-500">{formError}</p>}

                  <button
                    className="p-3 bg-[#61DAA2] text-white rounded-xl text-xl"
                    onClick={() => addNewAddress()}
                  >
                    {translations[language]?.saveadd}
                  </button>
                </div>
              </div>
            )}
          </div>
          {address.length > 0 && (
            <div className="hidden lg:block my-5">
              <h3 className="text-center p-2 ">Your  Addresses</h3>

              <div className="overflow-x-auto">
                <table className="table-fixed border border-1 w-full md:w-[80%] mx-auto rounded-xl">
                  <thead className="rounded">
                    <tr className="border-1 ">
                      <th className="p-3 text-center border-r ">
                        {translations[language]?.country}
                      </th>
                      <th className="p-3 text-center border-r ">
                        {translations[language]?.city}
                      </th>
                      <th className="p-3 text-center border-r ">
                        {translations[language]?.region}
                      </th>
                      <th className="p-3 text-center border-r ">
                        {translations[language]?.street}
                      </th>
                      <th className="p-3 text-center border-r ">
                        {translations[language]?.zipcode}
                      </th>
                      <th className="p-3 text-center border-r ">
                        {translations[language]?.action}
                      </th>
                      <th className="p-3 text-center border-r ">
                        {translations[language]?.delete}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {address.map((item) => (
                      <tr className="border-b">
                        <td className="p-3 text-center border-r">
                          {item.country}
                        </td>
                        <td className="p-3 text-center border-r">
                          {item.city}
                        </td>
                        <td className="p-3 text-center border-r">
                          {item.region}
                        </td>
                        <td className="p-3 text-center border-r">
                          {item.street}
                        </td>
                        <td className="p-3 text-center border-r">
                          {item.zipCode}
                        </td>
                        <td className="p-1 text-center border-r">
                          <button
                            onClick={() => handleSubmit(item.addressId)}
                            className="bg-[#3EBF87] text-white p-1 rounded-lg m-2 "
                          >
                            {translations[language]?.confirmorder}
                          </button>
                        </td>
                        <td className="p-1 text-center border-r">
                          <button
                            onClick={() => handleDeleteAddress(item.addressId)}
                            className="bg-[#c43714] text-white p-1 rounded-lg mt-2  "
                          >
                            {translations[language]?.deleteadd}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {address.length > 0 && (
            <div className="my-5 overflow-x-auto block lg:hidden">
              <h3 className="text-center p-2 ">Your Addresses</h3>

              <table className="table-fixed border border-1 w-[80%] mx-auto rounded-xl">
                <thead>
                  <tr>
                    <th className="p-3">{translations[language]?.header}</th>
                    {address.map((item, index) => (
                      <th key={`address_${index}`} className="p-3">
                        {`Address ${index + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3">{translations[language]?.country}</td>
                    {address.map((item, index) => (
                      <td key={`country_${index}`} className="p-3">
                        {item.country}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3">{translations[language]?.city}</td>
                    {address.map((item, index) => (
                      <td key={`city_${index}`} className="p-3">
                        {item.city}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3">{translations[language]?.region}</td>
                    {address.map((item, index) => (
                      <td key={`region_${index}`} className="p-3">
                        {item.region}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3">{translations[language]?.street}</td>
                    {address.map((item, index) => (
                      <td key={`street_${index}`} className="p-3">
                        {item.street}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3">{translations[language]?.zipcode}</td>
                    {address.map((item, index) => (
                      <td key={`zipcode_${index}`} className="p-3">
                        {item.zipCode}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3">{translations[language]?.action}</td>
                    {address.map((item, index) => (
                      <td key={`action_${index}`} className="p-3">
                        <button
                          onClick={() => handleSubmit(item.addressId)}
                          className="bg-[#3EBF87] text-white p-1 rounded-lg m-2"
                        >
                          {translations[language]?.confirmorder}
                        </button>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3">{translations[language]?.delete}</td>
                    {address.map((item, index) => (
                      <td key={`delete_${index}`} className="p-3">
                        <button
                          onClick={() => handleDeleteAddress(item.addressId)}
                          className="bg-[#c43714] text-white p-1 rounded-lg mt-2"
                        >
                          {translations[language]?.deleteadd}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>

      <Footer />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ConfirmOrder;
