import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  selectLanguage,
  selectTranslations,
  setLanguage,
} from "../rtk/slices/Translate-slice";
import { useSelector } from "react-redux";
import "./advertesment.css";
import { baseUrl } from "../rtk/slices/Product-slice";

const ImageSlider = ({ cursor }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    adaptiveHeight: true,
    customPaging: (i) => (
      <div className="slider-dot">
        <div className={`dot ${i === 0 ? "active" : ""}`}></div>
      </div>
    ),
  };

  const language = useSelector(selectLanguage);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/public/advertisement/all`,
          {
            headers: {
              "Accept-Language": language,
            },
          }
        );
        setImages(
          response.data.data.advertisements.map((advertisement) => ({
            id: advertisement.adId,
            src: advertisement.imgUrl,
            alt: advertisement.description,
          }))
        );
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="slider-container" style={{ overflowY: "hidden" }}>
      <Slider style={{ overflowY: "hidden" }} {...settings}>
        {images.map((image) => (
          <div
            key={image.id}
            className="w-full lg:w-[30%] "
          >
            <img
              src={image.src}
              alt={image.alt}
              width={150}
              height={150}
              className={`h-[130px] w-[130px] lg:w-[350px] lg:h-[350px]  rounded-[50px] mx-auto cursor-${cursor}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
