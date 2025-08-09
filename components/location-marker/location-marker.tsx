import { FunctionComponent, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import classNames from "classnames";
import { MapLocation } from "@/types/types";

import { LocationIcon } from "@/icons/LocationIcon";
import { LocationGallery } from "../location-gallery/location-gallery";

import "./location-marker.scss";
import { LocationListingDetails } from "../location-listing-details/LocationListingDetails";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SchoolIcon from "@mui/icons-material/School";
import ParkIcon from "@mui/icons-material/Park";

export const LocationMarker = ({ location }: { location: MapLocation }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const position = {
    lat: location.lat,
    lng: location.lng,
  };

  const renderCustomPin = () => {
    return (
      <>
        <div className="custom-pin">
          <button className="close-button">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="image-container">
            <LocationGallery isExtended={clicked} thumb={location.thumbnail} />
            <span className="icon">
              {location.type == "food" && (
                <RestaurantIcon className="restaurant" />
              )}
              {location.type == "school" && <SchoolIcon className="school" />}
              {location.type == "rec" && <ParkIcon className="rec" />}
            </span>
          </div>
          <LocationListingDetails />
        </div>
        <div className="tip" />
      </>
    );
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        title={"AdvancedMarker with custom html content."}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classNames("location-marker", { clicked, hovered })}
        onClick={() => setClicked(!clicked)}
      >
        {renderCustomPin()}
      </AdvancedMarker>
    </>
  );
};
