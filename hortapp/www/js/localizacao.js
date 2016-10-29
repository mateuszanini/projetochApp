var Localizacao = function() {
  this.latitude = null;
  this.longitude = null;
  this.mapa = null;
  this.marker = null;
};

Localizacao.prototype.localizacaoAtual = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    try {
      //centraliza o mapa
      this.mapa.setCenter({
        lat: this.latitude,
        lng: this.longitude
      });
      this.mapa.setZoom(18);
      // coloca o marcador
      this.marker.setMap(null);
      this.marker = new google.maps.Marker({
        position: {
          lat: this.latitude,
          lng: this.longitude
        },
        map: this.mapa
      });

      //pega o endereco e mostra na tela
      this.geocodeLatLng({
        lat: this.latitude,
        lng: this.longitude
      });
    } catch (err) {
      alert("localizacaoAtual: " + err.message);
    }
  });
};


Localizacao.prototype.initGeocoder = function() {
  try {
    this.geocoder = new google.maps.Geocoder();
  } catch (err) {
    alert('this.initGeocoder: ' + err.message);
  }
};

Localizacao.prototype.initMap = function(mapCanvas) {
  var chamarLocAtual = false;
  // myApp.showIndicator();
  //verifica se a latitude ou longitude é nula
  if (this.latitude == null || this.longitude == null) {
    //toma alguma ação
    //localização de Videira;
    this.latitude = -27.007458;
    this.longitude = -51.151072;
    chamarLocAtual = true;
  }
  try {
    //cria mapa
    this.mapa = new google.maps.Map(mapCanvas, {
      center: {
        lat: this.latitude,
        lng: this.longitude
      },
      zoom: 18
    });
    //adiciona marcador
    this.marker = new google.maps.Marker({
      position: {
        lat: this.latitude,
        lng: this.longitude
      },
      map: this.mapa
    });

    this.geocodeLatLng({
      lat: this.latitude,
      lng: this.longitude
    });

    //adiciona evento quando clicar no mapa
    this.mapa.addListener('click', function(e) {
      try {
        this.latitude = e.latLng.lat();
        this.longitude = e.latLng.lng();
        this.marker.setMap(null);
        this.marker = new google.maps.Marker({
          position: e.latLng,
          map: this.mapa
        });
        this.geocodeLatLng(e.latLng);
      } catch (err) {
        alert(" new google.maps.Marker: " + err.message);
      }
    });

    if (chamarLocAtual) this.localizacaoAtual();
  } catch (err) {
    alert("new google.maps.Map: " + err.message);
  }

};

Localizacao.prototype.geocodeAddress = function(endereco) {
  if (!this.geocoder) this.initGeocoder();
  this.geocoder.geocode({
    'address': endereco
  }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      // usuarioController.endereco.endLatitude =
      //   results[0].geometry.location.lat;
      // usuarioController.endereco.endLongitude =
      //   results[0].geometry.location.lng;
      this.latitude = results[0].geometry.location.lat;
      this.longitude = results[0].geometry.location.lng;

      this.mapa.setCenter(results[0].geometry.location);
      this.mapa.setZoom(18);
      //pega o endereco e mostra na tela
      this.geocodeLatLng(results[0].geometry.location);
      this.marker.setMap(null);
      this.marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: this.mapa
      });
    } else {
      myScript.notificacao(
        "Não foi possível pesquisar o endereço",
        "Motivo: " + status, false);
    }
  });
};

Localizacao.prototype.geocodeLatLng = function(latlng) {
  if (!this.geocoder) this.initGeocoder();
  // usuarioController.endereco.endLatitude = latlng.lat;
  // usuarioController.endereco.endLongitude = latlng.lng;
  this.geocoder.geocode({
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
      if (status = 'ZERO_RESULTS') {
        myScript.notificacao(
          "Nenhum endereco encontrado",
          "Tente selecionar outra localização",
          false);
      }
      //alert('Geocoder failed due to: ' + status);
    }
  });
};
