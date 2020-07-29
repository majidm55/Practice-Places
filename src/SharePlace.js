class Placefinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler);
    addressForm.addEventListener('submit', this.findAddressHandler);
  }
  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Location feature not available in your browser, please use a modern browser or manually enter the address');
      return;
    }
    navigator.geolocation.getCurrentPosition(successResult => {
      const coordinates = {
        lat: successResult.coords.latitude,
        lng: successResult.coords.longitude
      };
      console.log(coordinates);
    
    }, error => {
      alert('Could not locate you, please enter an address manually!')
    
    });
  };
  findAddressHandler() {};

}
const newPlaceFinder = new Placefinder();