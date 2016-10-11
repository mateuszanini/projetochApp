var localizacao = {
  initialize: function() {
    this.latitude = null;
    this.longitude = null;
    this.mapa = null;
    this.marker = null;
    navigator.geolocation.getCurrentPosition(function(position) {
      localizacao.latitude = position.coords.latitude;
      localizacao.longitude = position.coords.longitude
    });
  },
  initGeocoder: function() {
    try {
      localizacao.geocoder = new google.maps.Geocoder();
    } catch (err) {
      alert('localizacao.initGeocoder: ' + err.message);
    }
  },

  mostraLocal: function() {
    alert(localizacao.latitude + "," + localizacao.longitude);
  },

  initMap: function(mapCanvas) {
    myApp.showIndicator();
    navigator.geolocation.getCurrentPosition(function(position) {
      myApp.hideIndicator();
      localizacao.latitude = position.coords.latitude;
      localizacao.longitude = position.coords.longitude;
      try {
        localizacao.mapa = new google.maps.Map(mapCanvas, {
          center: {
            lat: localizacao.latitude,
            lng: localizacao.longitude
          },
          zoom: 18
        });
        localizacao.marker = new google.maps.Marker({
          position: {
            lat: localizacao.latitude,
            lng: localizacao.longitude
          },
          map: localizacao.mapa
        });
      } catch (err) {
        alert("new google.maps.Map: " + err.message);
      }

      localizacao.mapa.addListener('click', function(e) {
        try {
          localizacao.latitude = e.latLng.lat();
          localizacao.longitude = e.latLng.lng();
          localizacao.marker.setMap(null);
          localizacao.marker = new google.maps.Marker({
            position: e.latLng,
            map: localizacao.mapa
          });
          localizacao.geocodeLatLng(e.latLng);
        } catch (err) {
          alert(" new google.maps.Marker: " + err.message);
        }
      });
    });
  },

  geocodeAddress: function(endereco) {
    localizacao.geocoder.geocode({
      'address': endereco
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        localizacao.mapa.setCenter(results[0].geometry.location);
        localizacao.marker.setMap(null);
        localizacao.marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: localizacao.mapa
        });
      } else {
        alert('Não foi possível endereço pela seguinte razão: ' +
          status);
      }
    });
  },

  geocodeLatLng: function(latlng) {
    localizacao.geocoder.geocode({
      'location': latlng
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          // localizacao.map.setZoom(18);
          // localizacao.marker.setMap(null);
          // localizacao.marker = new google.maps.Marker({
          //   position: latlng,
          //   map: map
          // });
          alert(results[0].formatted_address);
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }
};
