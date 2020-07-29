import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { config } from './config';
import { getCoords } from './Utility/Location';

const apikey = config.api_key;
const head = document.getElementsByTagName('head')[0];
const sc = document.createElement('script');
sc.defer = true;
sc.async = true;
sc.src = `https://maps.googleapis.com/maps/api/js?key=${apikey}`;
head.appendChild(sc);

class Placefinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Location feature not available in your browser, please use a modern browser or manually enter the address');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Loading location - Please wait!');
    modal.show();
    navigator.geolocation.getCurrentPosition(successResult => {
      modal.hide();
      const coordinates = {
        lat: successResult.coords.latitude,
        lng: successResult.coords.longitude
      };
      this.selectPlace(coordinates);
    
    }, error => {
      modal.hide();
      alert('Could not locate you, please enter an address manually!')
    
    });
  };
  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      alert('Invalid address entered - please try again!')
      return;
    }
    const modal = new Modal('loading-modal-content', 'Loading location - Please wait!');
    modal.show();
    try {
      const coordinates = await getCoords(address);
      this.selectPlace(coordinates);
    } catch (err) {
        alert(err.message);
    }
    modal.hide();
  }


}
const newPlaceFinder = new Placefinder();