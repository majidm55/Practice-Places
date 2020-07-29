import { Modal } from './UI/Modal';
import { Map } from './UI/Map';

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
  findAddressHandler() {};

}
const newPlaceFinder = new Placefinder();