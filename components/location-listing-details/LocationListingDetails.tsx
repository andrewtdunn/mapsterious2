import React, { FunctionComponent } from "react";

import { getFormattedCurrency } from "@/libs/format-currency";
import { BathroomIcon } from "@/icons/BathroomIcon";
import { BedroomIcon } from "@/icons/BedroomIcon";
import { FloorplanIcon } from "@/icons/FloorplanIcon";

import { ListingDetails } from "../../types/types";

import "./location-listing-details.scss";

interface Props {
  details?: ListingDetails;
}

export const LocationListingDetails: FunctionComponent<Props> = ({
  details,
}) => {
  if (!details) {
    return null;
  }
  const {
    property_address,
    property_price,
    listing_title,
    property_bedrooms,
    property_bathrooms,
    property_square_feet,
    listing_description,
  } = details;

  return (
    <div className="details-container">
      <div className="listing-content">
        <h2>{listing_title}</h2>
        <p>{property_address}</p>
        <div className="details">
          <div className="detail_item">
            <FloorplanIcon /> {property_square_feet.replace("sq ft", "ft²")}
          </div>
          <div className="detail_item">
            <BathroomIcon /> {property_bathrooms}
          </div>
          <div className="detail_item">
            <BedroomIcon /> {property_bedrooms}
          </div>
        </div>

        <p className="description">{listing_description}</p>

        <p className="price">{getFormattedCurrency(property_price)}</p>
      </div>
    </div>
  );
};
