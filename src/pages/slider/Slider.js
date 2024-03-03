import React, { useEffect, useState } from "react";
import axios from "axios";
import slide1 from '../../images/slide1.png'
import slide2 from '../../images/slide2.png'
import "./slider.css";
import { baseUrl } from "../../rtk/slices/Product-slice";

function Slider() {
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${baseUrl}/public/advertisement/all`,
  //         {
  //           headers: {
  //             "Accept-Language": "fr",
  //           },
  //         }
  //       );
  //       setImages(
  //         response.data.data.advertisements.map(
  //           (advertisement) => advertisement.imgUrl
  //         )
  //       );
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };

  //   fetchImages();
  // }, []);
const images = [slide1,slide2]
  return (
    <section id="slider" className="mt-0">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""} h-[400px]`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain bg-white"
                  alt={`slider-${index}`}
                />
              ) : (
                <div className="w-full h-[400px]  bg-white"></div>
              )}

            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}

export default Slider;
