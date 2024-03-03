import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLanguage, selectTranslations } from '../rtk/slices/Translate-slice';
import { Link } from 'react-router-dom';
import logo from '.././images/Vita Logo2.png';
import lotion2 from '.././images/lotion2.png';
import { FaSearch } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';
import NavHeader from '../components/NavHeader';
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import './dialogblog.css';

const DialogBlog = ({ isOpen, onCancel, blogContent  }) => {
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const pageLinkRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    
  }, [language]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
      onCancel();
    }
  };

  const handleCopyLink = () => {
    pageLinkRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      {isOpen && blogContent  && (
        <div className="popup" onClick={handleOverlayClick}>
          <div className="popup-content">
          

            <div className="green-container">
              <div className="blog-container dialogContainer ">
                <div className="blog-flexDialog ">
                  <div className="blogimg ">
                    {blogContent .poster && (
                      <img src={`data:image/png;base64,${blogContent .poster}`} alt="Blog poster" />
                    )}
                  </div>
                  <div className="infoblog">
                    <div className="like-share">
                      <div className="share">
                        {/* ... (existing code) */}
                      </div>
                    </div>
                    <h5>{ blogContent .title}</h5>
                  <div className='share'>
                    <input
                      ref={pageLinkRef}
                      type="text"
                      readOnly
                      value={window.location.href}
                      style={{ position: 'absolute', left: '-9999px' }}
                    />
                    <IoMdShare
                      style={{ fontSize: '40px', cursor: 'pointer' }}
                      className='icon'
                      onClick={handleCopyLink}
                    />
                    {isCopied && <span style={{ marginLeft: '5px', color: '#3A7E89' }}>Link copied!</span>}
                  </div>
                    <p>{blogContent .descreption}</p>
                  </div>
                </div>
              </div>
         

              <div className="footerr footerPhr">
            <div className=" header-container ">
              <div className="flexFooter">
                <div className="cartfooter">
                  <div className="important">
                    <h1>{translations[language]?.important}</h1>
                    <Link className="footerlink">{translations[language]?.privacy} </Link>
                    <Link className="footerlink">{translations[language]?.cookies} </Link>
                    <Link className="footerlink">{translations[language]?.terms} </Link>
                  </div>
                  <div className="information">
                    <h1>{translations[language]?.information}</h1>
                    <h2>
                    {translations[language]?.pfooter}
                    </h2>
                  </div>
                </div>
                <div className="cartfooter cartfootertwo">
                  <div className="important">
                    <h1>{translations[language]?.contactdetails}</h1>
                    <h2>
                    {translations[language]?.require}
                    </h2>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogBlog;
