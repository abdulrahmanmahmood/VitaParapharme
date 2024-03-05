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
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="p-4">{translations[language]?.country}</th>
                <th className="p-4">{translations[language]?.city}</th>
                <th className="p-4">{translations[language]?.region}</th>
                <th className="p-4">{translations[language]?.street}</th>
                <th className="p-4">{translations[language]?.zipcode}</th>
                <th className="p-4">{translations[language]?.action}</th>
                <th className="p-4">{translations[language]?.delete}</th>
              </tr>
            </thead>
            <tbody>
              {address.map((item) => (
                <tr>
                  <td>{item.country}</td>
                  <td>{item.city}</td>
                  <td>{item.region}</td>
                  <td>{item.street}</td>
                  <td>{item.zipCode}</td>
                  <td>
                    <button
                      onClick={() => handleSubmit(item.addressId)}
                      className="useaddress"
                    >
                      {translations[language]?.confirmorder}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteAddress(item.addressId)}
                      className="useaddress2"
                    >
                      {translations[language]?.deleteadd}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            {address.length > 4 ? (
              <h3>Max addresses 5</h3>
            ) : (
              <button
                className="useaddress"
                onClick={() => setShowForm(!showForm)}
              >
                {translations[language]?.addaddress}
              </button>
            )}

            {showForm && (
              <>
                <Table striped bordered hover size="sm" className="mt-4">
                  <thead>
                    <tr>
                      <th className="p-4">{translations[language]?.country}</th>
                      <th className="p-4">{translations[language]?.city}</th>
                      <th className="p-4">{translations[language]?.region}</th>
                      <th className="p-4">{translations[language]?.street}</th>
                      <th className="p-4">{translations[language]?.zipcode}</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select
                          className="form-select"
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
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleInputChange(e, "city")}
                          value={newAddress.city}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleInputChange(e, "region")}
                          value={newAddress.region}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleInputChange(e, "street")}
                          value={newAddress.street}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleInputChange(e, "zipCode")}
                          value={newAddress.zipCode}
                        />
                      </td>
                      <td>
                        <button
                          className="useaddress"
                          onClick={() => addNewAddress()}
                        >
                          {translations[language]?.saveadd}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </div>
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
