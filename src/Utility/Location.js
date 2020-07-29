import { config } from '../config';
const apikey = config.api_key;

export async function getAddress(coords) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}
&location_type=ROOFTOP&result_type=street_address&key=${apikey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch address. Please try')
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  const address = data.results[0].formatted_address;
  return address;
}

export async function getCoords(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${apikey}`)
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates. Please try')
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const coordinates = data.results[0].geometry.location;
  console.log(coordinates);
  return coordinates;
}