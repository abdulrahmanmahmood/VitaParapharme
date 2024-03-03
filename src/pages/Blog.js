import React, { useState, useRef, useEffect } from "react";
import "./stylehome.css";
import "./blog.css";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";

import { IoMdShare } from "react-icons/io";
import logo from "../images/Vita Logo2.png";
import lotion2 from "../images/lotion2.png";
import axios from "axios";
import { useSelector } from "react-redux";
import DialogBlog from "./DialogBlog";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import { useDispatch } from "react-redux";
import NavHeader from "../components/NavHeader";
import { useNavigate } from "react-router-dom";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { FaSearch } from "react-icons/fa";
import { selectToken } from "../rtk/slices/Auth-slice";
import WhatsAppIcon from "../components/Whatsapp";
import Footer from "../components/Footer";
import { baseUrl } from "../rtk/slices/Product-slice";

function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [dialogBlogContent, setDialogBlogContent] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const pageLinkRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const bearerToken = useSelector(selectToken);

  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const handleDetailsClick = () => {
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };

  const handleCopyLink = () => {
    pageLinkRef.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseUrl}/public/post/all`, {
          headers: {
            "Accept-Language": language,
          },
        });
        setBlogs(response.data.data.posts);
        console.log("success fetch blogs", response.data.data.posts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = async (clickedBlog) => {
    try {
      const response = await axios.get(
        `${baseUrl}/public/post/${clickedBlog.blogPostId}`,
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      setDetailsOpen(true);
      setDialogBlogContent(response.data.data.posts);
      navigate(`/blog/${clickedBlog.blogPostId}`);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setLoading(false);
    }
  };

  const allProducts = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [searchTermBlog, setSearchTermBlog] = useState("");
  const [productExistsInCategory, setProductExistsInCategory] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetErrorMessage = () => {
    setShowErrorMessage(false);
    setProductExistsInCategory(true); // Reset the product exists flag if needed
  };

  const handleSearchChangeBlog = (e) => {
    const term = e.target.value;
    setSearchTermBlog(term.toLowerCase());
  };

  const handleSearchSubmitBlog = async (e) => {
    e.preventDefault();
    const foundBlog = blogs.find(
      (blog) =>
        blog.title.toLowerCase().includes(searchTermBlog) ||
        blog.content.toLowerCase().includes(searchTermBlog)
    );

    if (foundBlog) {
      navigate(`/blog/${foundBlog.blogPostId}`);
    } else {
      setProductExistsInCategory(false);
      setShowErrorMessage(true);
      setTimeout(() => {
        resetErrorMessage();
        setSearchTermBlog("");
      }, 3000);
    }
  };

  return (
    <div className="page-container">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="mt-[150px]">
        <div className="">
          <div className="border-black border-[1px] lg:py-2  border-solid w-[80%] lg:w-[50%] h-30 mx-auto mt-6 rounded-xl">
            <form className="flex flex-row py-1 w-[95%] mx-auto ">
              <input
                placeholder={translations[language]?.searchblog}
                value={searchTermBlog}
                onChange={handleSearchChangeBlog}
                className="p-2   w-full"
              />
              <button
                type="submit"
                className="p-2 ml-2  "
              >
                <FaSearch className="text-xl" />
              </button>
            </form>

            <div className="autocom-box autocom-blog">
              {productExistsInCategory === false && (
                <div className="error-message">
                  Blog not found. Please try another search.
                </div>
              )}
            </div>
          </div>
          <WhatsAppIcon />

          {loading && (
            <div
              className="loading-spinner"
              style={{ width: "50px", height: "50px", marginTop: "10em" }}
            ></div>
          )}
          {!loading && (
            <div className="blog-container">
              {blogs.length > 0 && (
                <div>
                  <div className="blogContent">
                    <div className="blog-flex">
                      <div className="blogimg">
                        <img
                          src={
                            selectedBlog
                              ? selectedBlog.pictureUrl
                              : blogs[0].pictureUrl
                          }
                          alt="Blog poster"
                        />
                      </div>
                      <div className="infoblog">
                        <div className="flexiconwithinput">
                          <div>
                            {isCopied && (
                              <span
                                style={{ marginLeft: "5px", color: "#3A7E89" }}
                              >
                                Link copied!
                              </span>
                            )}
                            <input
                              ref={pageLinkRef}
                              type="text"
                              readOnly
                              value={window.location.href}
                              style={{ position: "absolute", left: "-9999px" }}
                            />
                          </div>
                        </div>
                        <div>
                          {/*<h5>{selectedBlog ? selectedBlog.title : blogs[0].title}</h5>*/}
                        </div>
                        <h5>
                          {selectedBlog ? selectedBlog.title : blogs[0].title}
                        </h5>
                        <h6>
                          {selectedBlog
                            ? selectedBlog.content
                            : blogs[0].content.substring(0, 600)}
                          ...
                        </h6>
                        <div className="readArticle">
                          <button
                            onClick={() => handleBlogClick(blogs[0])}
                            className="read"
                          >
                            read article
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-blog header-container"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {blogs.slice(1).map((blog) => (
                      <div
                        className="card1 card1blog"
                        key={blog.blogPostId}
                        style={{ flex: "0 0 33.33%", padding: "0 15px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <img
                            src={blog.pictureUrl}
                            alt="Blog poster"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <h5 style={{ textAlign: "center", margin: "10px 0" }}>
                            {blog.title}
                          </h5>
                          <p style={{ textAlign: "center" }}>
                            {blog.content.substring(0, 125)}...
                          </p>
                          <div
                            className="buttons"
                            style={{ textAlign: "center", marginTop: "10px" }}
                          >
                            <button
                              onClick={() => handleBlogClick(blog)}
                              className="read"
                            >
                              read article
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <Footer />
        <DialogBlog
          isOpen={detailsOpen}
          onCancel={handleCancelDetails}
          blogContent={dialogBlogContent}
        />
      </div>
    </div>
  );
}

export default Blog;
