/*
Since the map was loaded on the client side,
we need to make this component clent-rendered as well
or else an error occurs.
*/
"use client";

// Map component from Library
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  Pin,
} from "@vis.gl/react-google-maps";
import type { Schema } from "@/amplify/data/resource";
import { LocationMarker } from "../location-marker/location-marker";
import { MapLocation } from "@/types/types";

// Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "100vh",
  borderRadius: "15px 0px 0x 15px",
};

// const defaultMapCenter = {
//   lat: 35.8799866,
//   lng: 76.5048004,

// };

const defaultMapCenter = { lat: 41.850033, lng: -87.6500523 };

const defaultMapZoom = 3;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "satellite",
  disableDefaultUI: true,
};

const MapComponent = ({
  locations,
}: {
  locations: Array<Schema["Location"]["type"]>;
}) => {
  return (
    <div className="w-full animated-marker-map">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["marker"]}
      >
        <Map
          mapId={"bf51a910020fa25a"}
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={defaultMapCenter}
          defaultZoom={defaultMapZoom}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapTypeId={"satellite"}
          tilt={0}
        >
          {/* <AdvancedMarker position={defaultMapCenter} title="ok">
            <Pin
              background={"#22ccff"}
              borderColor={"#1e89a1"}
              glyphColor={"#0f677a"}
            ></Pin>
          </AdvancedMarker> */}
          {locations.map((location, index) => {
            return (
              <LocationMarker
                key={index}
                location={location as MapLocation}
              ></LocationMarker>
            );
          })}
          {/* {locations.map((location, index) => {
            return (
              <InfoWindow
                key={index}
                position={{ lat: location.lat!, lng: location.lng! }}
                maxWidth={100}
              >
                <p>{location.name}</p>
              </InfoWindow>
            );
          })} */}
          {/* <Marker
            position={defaultMapCenter}
            clickable={true}
            onClick={() => alert("marker was clicked!")}
            title={"ok"}
          ></Marker> */}
        </Map>
      </APIProvider>
    </div>
  );
};

export { MapComponent };
