import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdShare } from "react-icons/io";
import NavHeader from "../components/NavHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import { useRef } from "react";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { Link } from "react-router-dom";
import lotion2 from "../images/lotion2.png";
import { AiOutlineLike } from "react-icons/ai";
import { selectToken } from "../rtk/slices/Auth-slice";
import { AiOutlineDislike } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import WhatsAppIcon from "../components/Whatsapp";
import Footer from "../components/Footer";
import { baseUrl } from "../rtk/slices/Product-slice";
import { Helmet } from "react-helmet";

function BlogDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState([]);
  /*const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, Poster: file });
  };*/
  const [isCopied, setIsCopied] = useState(false);
  const pageLinkRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const allProducts = useSelector((state) => state.products);
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [searchTerm, setSearchTerm] = useState("");
  const bearerToken = useSelector(selectToken);
  const { blogId } = useParams();
  const [blogDetails, setBlogDetails] = useState(null);
  const isUserLoggedIn = useSelector(selectToken) !== null;
  const [like, setLike] = useState([]);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/public/post/${params.blogId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": language,
            },
          }
        );
        const data = await response.json();
        setBlogDetails(data.data.post);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [params.blogId]);

  if (!blogDetails) {
    return <div>Loading...</div>;
  }

  const handleCopyLink = () => {
    if (pageLinkRef.current) {
      // const blogTitle = blogDetails?.title;
      const pageURL = window.location.href;
      const linkWithTitle = `${pageURL}`;

      pageLinkRef.current.select();
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const isProductInWishlist = (blogPostId) => {
    return blogDetails && like.some((item) => item.blogPostId === blogPostId);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddToLikes = async (blogPostId) => {
    try {
      if (!isUserLoggedIn) {
        setModalMessage("please sign in first");
        setShowModal(true);
        return;
      }
      let updatedLike;

      if (isProductInWishlist(blogPostId)) {
        await handleDeleteFromLike(blogPostId);
        updatedLike = like.filter((item) => item.blogPostId !== blogPostId);
      } else {
        await axios.put(
          `${baseUrl}/user/like/${blogPostId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Accept-Language": language,
            },
          }
        );
        updatedLike = [...like, { blogPostId }];
        console.log("added like successfully");
      }
      setLike(updatedLike);
    } catch (error) {
      console.error("Error updating product in wishlist: ", error.message);
    }
  };

  const handleDeleteFromLike = async (blogPostId) => {
    try {
      if (!isUserLoggedIn) {
        setModalMessage("please sign in first");
        setShowModal(true);
        return;
      }
      await axios.delete(`${baseUrl}/user/unlike/${blogPostId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });
      console.log("deleted succefully");
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      if (!isUserLoggedIn) {
        setModalMessage("please sign in first");
        setShowModal(true);
        return;
      }

      await axios.put(
        `${baseUrl}/user/dislike/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
          },
        }
      );
      console.log("Post disliked successfully");
      setIsDisliked(!isDisliked);
    } catch (error) {
      console.error("Error disliking post:", error.message);
    }
  };

  return (
    <div className="">
      <Helmet>
        <link rel="icon" href={blogDetails.pictureUrl} />
        <link rel="apple-touch-icon" href={blogDetails.pictureUrl} />
        <link rel="manifest" href={blogDetails.pictureUrl} />
        <link rel="icon" href={blogDetails.pictureUrl} />
        <title>{blogDetails.title}</title>
        <meta property="og:title" content={blogDetails.content} />
        <meta property="description" content={`${blogDetails.content} `}/>
        <meta property="og:image" content={blogDetails.pictureUrl} />
      </Helmet>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="bg-gray-50 bottom-0 overflow-y-hidden mt-[150px] ">
        <div className="">
          <WhatsAppIcon />
          <div className="md:mr-24 mx-4 overflow-y-hidden min-h-screen">
            <div>
              <div className="">
                <div className="flex flex-col md:flex-row">
                  <div className="w-[100%] md:w-[40%] bg-transparent md:ml-20   mt-12">
                    <img
                      className="w-full h-[100%] md:w-[90%]  rounded-tr-3xl rounded-bl-3xl"
                      src={blogDetails && blogDetails.pictureUrl}
                      alt="Product poster"
                    />
                  </div>

                  <div className="w-[100%] md:w-[60%] mt-[3em]">
                    <div className="flex flex-row">
                      <div className="flex flex-row items-center justify-start mb-5 bg-[#61DAA2] w-36 rounded-lg py-2">
                        <div className="">
                          <AiOutlineLike
                            style={{
                              fontSize: "35px",
                              cursor: "pointer",
                              color: isProductInWishlist(
                                blogDetails?.blogPostId
                              )
                                ? "blue"
                                : "white",
                            }}
                            className="ml-[10px]"
                            onClick={() =>
                              handleAddToLikes(blogDetails?.blogPostId)
                            }
                          />
                        </div>

                        <div className="">
                          <AiOutlineDislike
                            style={{
                              fontSize: "35px",
                              cursor: "pointer",
                              color: isDisliked ? "blue" : "white",
                            }}
                            className="ml-[10px]"
                            onClick={() =>
                              handleDislike(blogDetails?.blogPostId)
                            }
                          />
                        </div>

                        <div className="">
                          <IoMdShare
                            style={{
                              fontSize: "35px",
                              cursor: "pointer",
                              color: "white",
                            }}
                            className="ml-[10px]"
                            onClick={handleCopyLink}
                          />
                        </div>
                      </div>
                      <div>
                        {isCopied && (
                          <span style={{ marginLeft: "5px", color: "#3A7E89" }}>
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

                    {blogDetails ? (
                      <div>
                        <h5>{blogDetails.title}</h5>
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                    {blogDetails ? (
                      <div>
                        <h6>{blogDetails.content}</h6>
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
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

export default BlogDetails;
