var Localizacao = function() {
    this.latitude = null;
    this.longitude = null;
    this.mapa = null;
    this.marker = null;
    this.mapCanvas = null;
    this.divEnderecoAtual = null;
};

Localizacao.prototype.initMap = function() {
    var localizacao = this;
    var chamarLocAtual = false;
    // myApp.showIndicator();
    //verifica se a latitude ou longitude é nula
    if (localizacao.latitude == null || localizacao.longitude == null) {
        //toma alguma ação
        //localização de Videira;
        localizacao.latitude = -27.007458;
        localizacao.longitude = -51.151072;
        chamarLocAtual = true;
    }
    try {
        console.log('cria mapa');
        localizacao.mapa = new google.maps.Map(localizacao.mapCanvas, {
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
                localizacao.geocodeLatLng({
                    lat: localizacao.latitude,
                    lng: localizacao.longitude
                });
            } catch (err) {
                alert(" new google.maps.Marker: " + err.message);
            }
        });

        if (chamarLocAtual) localizacao.localizacaoAtual();
    } catch (err) {
        alert("new google.maps.Map: " + err.message);
    }

};

Localizacao.prototype.localizacaoAtual = function() {
    var localizacao = this;
    navigator.geolocation.getCurrentPosition(function(position) {
        localizacao.latitude = position.coords.latitude;
        localizacao.longitude = position.coords.longitude;
        try {
            //centraliza o mapa
            localizacao.mapa.setCenter({
                lat: localizacao.latitude,
                lng: localizacao.longitude
            });
            localizacao.mapa.setZoom(18);
            // coloca o marcador
            localizacao.marker.setMap(null);
            localizacao.marker = new google.maps.Marker({
                position: {
                    lat: localizacao.latitude,
                    lng: localizacao.longitude
                },
                map: localizacao.mapa
            });

            //pega o endereco e mostra na tela
            localizacao.geocodeLatLng({
                lat: localizacao.latitude,
                lng: localizacao.longitude
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


Localizacao.prototype.geocodeAddress = function(endereco) {
    //variavel que recebe o objeto localizacao
    var localizacao = this;
    if (!localizacao.geocoder) localizacao.initGeocoder();
    localizacao.geocoder.geocode({
        'address': endereco
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            localizacao.latitude = results[0].geometry.location.lat();
            localizacao.longitude = results[0].geometry.location.lng();

            localizacao.mapa.setCenter(results[0].geometry.location);
            localizacao.mapa.setZoom(18);
            //pega o endereco e mostra na tela
            localizacao.geocodeLatLng({
                lat: localizacao.latitude,
                lng: localizacao.longitude
            });
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
};

Localizacao.prototype.geocodeLatLng = function(latlng) {
    var localizacao = this;
    if (!localizacao.geocoder) localizacao.initGeocoder();
    localizacao.latitude = latlng.lat;
    localizacao.longitude = latlng.lng;
    localizacao.geocoder.geocode({
        'location': latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                var enderecoCompleto = results[0].formatted_address;
                console.log(enderecoCompleto);
                try {
                    localizacao.divEnderecoAtual.innerHTML =
                        '<p class="text-center"><i class="fa fa-map-signs" aria-hidden="true"></i>&nbsp ' +
                        enderecoCompleto + '</p>';
                } catch (e) {
                    console.log("Erro aqui: " + e);
                }
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

Localizacao.prototype.pesquisaCep = function(cep, callback) {
    $.ajax({
        url: "https://viacep.com.br/ws/" + cep + "/json",
        method: "GET",
        beforeSend: function(xhr) {
            myApp.showIndicator();
        },
        success: function(data) {
            if (!("erro" in data)) {
                callback(data);
                return true;
            } else {
                myScript.notificacao("CEP não encontrado",
                    "Por favor, digite um CEP existente.", false);
            }
        },
        error: function(data, status, xhr) {
            myScript.notificacao("Erro desconhecido",
                "Tente novamente mais tarde", false);
        },
        complete: function(xhr, status) {
            myApp.hideIndicator();
        }
    });
};
