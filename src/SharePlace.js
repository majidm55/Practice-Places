import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { config } from './config';
import { getCoords, getAddress } from './Utility/Location';

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
    this.shareBtn = document.getElementById('share-btn');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    // this.shareBtn.addEventListener('click');
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const sharedLinkInput = document.getElementById('share-link');
    sharedLinkInput.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;

  }

  async locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Location feature not available in your browser, please use a modern browser or manually enter the address');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Loading location - Please wait!');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async successResult => {
      const coordinates = {
        lat: successResult.coords.latitude,
        lng: successResult.coords.longitude
      };
      const address = await getAddress(coordinates);
      modal.hide();
      this.selectPlace(coordinates, address);
    
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
      this.selectPlace(coordinates, address);
    } catch (err) {
        alert(err.message);
    }
    modal.hide();
  }


}
const newPlaceFinder = new Placefinder();