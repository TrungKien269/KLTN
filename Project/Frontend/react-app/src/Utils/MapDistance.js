import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyA6yguXT9Axmq4YONkT7flSBv9kqKEv3wY");
Geocode.setLanguage("vn");
Geocode.setRegion("vn");

const lat = 10.851769;
const lng = 106.772179;

export const CalculateDistance = (fullAddress) => {
  var response = Geocode.fromAddress(fullAddress).then(
    response => {
      let newLat = response.results[0].geometry.location.lat;
      let newLng = response.results[0].geometry.location.lng;
      var distanceInMeters = window.google.maps.geometry.spherical
        .computeDistanceBetween(new window.google.maps.LatLng(lat, lng),
          new window.google.maps.LatLng(newLat, newLng));
      var result = (distanceInMeters * 0.001).toFixed(2);
      return result;
    },
    error => {
      console.error(error);
      return -1;
    }
  );
  return response;
};