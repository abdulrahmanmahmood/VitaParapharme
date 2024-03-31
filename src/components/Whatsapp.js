import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppIcon = () => {
  return (
    <div className=" fixed bottom-16 lg:bottom-10 right-5 z-40 lg:text-[70px] text-[50px]">
      <a
        href="https://web.whatsapp.com/send?phone=+212 708-759037"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp style={{ color: "#3EBF87" }} />
      </a>
    </div>
  );
};

export default WhatsAppIcon;
