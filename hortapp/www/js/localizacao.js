var localizacao = {
  initialize: function() {
    this.latitude = null;
    this.longitude = null;
    this.mapa = null;
    this.marker = null;
    navigator.geolocation.getCurrentPosition(function(position) {
      localizacao.latitude = position.coords.latitude;
      localizacao.longitude = position.coords.longitude;
    });
  },

  localizacaoAtual: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      localizacao.latitude = position.coords.latitude;
      localizacao.longitude = position.coords.longitude;

      try {
        //cria mapa
        localizacao.mapa = new google.maps.Map(mapCanvas, {
          center: {
            lat: localizacao.latitude,
            lng: localizacao.longitude
          },
          zoom: 18
        });
        //adiciona marcador
        localizacao.marker = new google.maps.Marker({
          position: {
            lat: localizacao.latitude,
            lng: localizacao.longitude
          },
          map: localizacao.mapa
        });

        localizacao.geocodeLatLng({
          lat: localizacao.latitude,
          lng: localizacao.longitude
        });
      } catch (err) {
        alert("new google.maps.Map: " + err.message);
      }
    });
  },

  initGeocoder: function() {
    try {
      localizacao.geocoder = new google.maps.Geocoder();
    } catch (err) {
      alert('localizacao.initGeocoder: ' + err.message);
    }
  },

  initMap: function(mapCanvas) {
    // myApp.showIndicator();
    try {
      //cria mapa
      localizacao.mapa = new google.maps.Map(mapCanvas, {
        center: {
          lat: localizacao.latitude,
          lng: localizacao.longitude
        },
        zoom: 18
      });
      //adiciona marcador
      localizacao.marker = new google.maps.Marker({
        position: {
          lat: localizacao.latitude,
          lng: localizacao.longitude
        },
        map: localizacao.mapa
      });

      localizacao.geocodeLatLng({
        lat: localizacao.latitude,
        lng: localizacao.longitude
      });

      //adiciona evento quando clicar no mapa
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
    } catch (err) {
      alert("new google.maps.Map: " + err.message);
    }
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
        myScript.notificacao(
          "Não foi possível pesquisar o endereço",
          "Motivo: " + status, false);
      }
    });
  },

  geocodeLatLng: function(latlng) {
    usuarioController.endereco.endLatitude = latlng.lat;
    usuarioController.endereco.endLongitude = latlng.lng;
    localizacao.geocoder.geocode({
      'location': latlng
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var enderecoCompleto = results[0].formatted_address;
          $(".usuLocalizacao").html(
            '<p class="text-center"><i class="fa fa-map-signs" aria-hidden="true"></i>&nbsp ' +
            enderecoCompleto + '</p>');
        } else {
          myScript.notificacao(
            "Selecione uma localização válida pertencente ao Brasil",
            "Você selecionou: " + results[0].formatted_address,
            false);
        }
        /*
        0: R.das Palmeiras, 233 - São Francisco, Videira - SC, 89560 - 000, Brasil
        1: São Francisco, Videira - SC, Brasil
        2: Videira, SC, Brasil
        3: Videira - SC, 89560 - 000, Brasil
        4: Videira - SC, Brasil
        5: Santa Catarina, Brasil
        6: Brasil
        */
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }
};
