import React, { useState, FunctionComponent, MouseEvent } from "react";

import "./location-gallery.scss";
interface Props {
  images?: string[];
  isExtended: boolean;
  thumb?: string;
}

export const LocationGallery: FunctionComponent<Props> = ({
  images = [
    "/data/images/front.jpg",
    "/data/images/bedroom.jpg",
    "/data/images/back.jpg",
  ],
  isExtended = false,
  thumb = "thumb.jpg",
}) => {
  images.unshift(
    "https://s3-us-west-2.amazonaws.com/andrewdunn-pictures/images/" + thumb
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className={`photo-gallery ${isExtended ? "extended" : ""}`}>
      <img src={images[currentImageIndex]} alt="Real estate listing photo" />

      <div className="gallery-navigation">
        <div className="nav-buttons">
          <button onClick={handleBack} disabled={currentImageIndex === 0}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentImageIndex === images.length - 1}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};
