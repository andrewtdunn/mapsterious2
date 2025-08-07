import { ListingDetails } from "@/types/types";

import frontImage from "../data/images/front.jpg";
import bedroomImage from "../data/images/bedroom.jpg";
import backImage from "../data/images/back.jpg";

export async function loadRealEstateListing(): Promise<ListingDetails> {
  const url = new URL("../data/real-estate-listing.json", import.meta.url);

  const listing = (await fetch(url).then((res) =>
    res.json()
  )) as ListingDetails;

  return listing;
}
