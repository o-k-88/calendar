import React from "react";

import image01 from "../images/01month.jpg";
import image02 from "../images/02month.jpg";
import image03 from "../images/03month.jpg";
import image04 from "../images/04month.jpg";
import image05 from "../images/05month.jpg";
import image06 from "../images/06month.jpg";
import image07 from "../images/07month.jpg";
import image08 from "../images/08month.jpg";
import image09 from "../images/09month.jpg";
import image10 from "../images/10month.jpg";
import image11 from "../images/11month.jpg";
import image12 from "../images/12month.jpg";

const images = {
  image0: image01,
  image1: image02,
  image2: image03,
  image3: image04,
  image4: image05,
  image5: image06,
  image6: image07,
  image7: image08,
  image8: image09,
  image9: image10,
  image10: image11,
  image11: image12,
};

const EventSideBarImage = ({ currentMonth }) => {
  return (
    <div className="sidebar-image">
      <img className="image" src={images[`image${currentMonth}`]} alt="alt" />
    </div>
  );
};

export default EventSideBarImage;
