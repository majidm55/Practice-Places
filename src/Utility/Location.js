import { config } from '../config';

export async function getCoords(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${config.api_key}`)
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