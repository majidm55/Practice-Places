// import { map } from "core-js/fn/array";

export class Map {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
  }
  render(coordinates) {
    if (!google) {
      alert('Could not load maps library , please try later');
      return;
    }

    const googleMap = new google.maps.Map(document.getElementById('map'), {center: coordinates,
    zoom: 16
    }); 

    new google.maps.Marker({
      position : coordinates,
      map: googleMap
    });
  }
}