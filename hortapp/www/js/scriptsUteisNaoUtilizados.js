var localizacao = {
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
                myScript.notificacao("Não foi possível pesquisar o endereço", "Motivo: " + status, false);
            }
        });
    },

    geocodeLatLng: function(latlng) {
        localizacao.geocoder.geocode({
            'location': latlng
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var enderecoCompleto = results[0].formatted_address;
                    enderecoCompleto = enderecoCompleto.split(", ");

                    /* UTILIZAR ISTO
                    http://stackoverflow.com/questions/8313876/more-efficient-way-to-extract-address-components
                    https://developers.google.com/maps/documentation/javascript/geocoding?hl=pt-br

                    var country, postal_code, locality, sublocality;
                    for (i = 0; i < results[0].address_components.length; ++i) {
                        for (j = 0; j < results[0].address_components[i].types.length; ++j) {
                            if (!country && results[0].address_components[i].types[j] == "country")
                                country = results[0].address_components[i].long_name;
                            else if (!postal_code && results[0].address_components[i].types[j] == "postal_code")
                                postal_code = results[0].address_components[i].long_name;
                            else if (!locality && results[0].address_components[i].types[j] == "locality")
                                locality = results[0].address_components[i].long_name;
                            else if (!sublocality && results[0].address_components[i].types[j] == "sublocality")
                                sublocality = results[0].address_components[i].long_name;
                        }
                    }
                    console.log(country);
                    console.log(postal_code);
                    console.log(locality);
                    console.log(sublocality);

                    console.log(results[0].address_components);
                    */

                    var enderecoLogradouro;
                    var enderecoNumeroBairro;
                    var enderecoCidadeEstado;
                    var enderecoCep;
                    var enderecoPais;

                    var validacep = /^[0-9]{5}[-][0-9]{3}$/;
                    var existeCep = false;
                    for (var i = 0; i < enderecoCompleto.length; i++) {
                        if (validacep.test(enderecoCompleto[i])) {
                            existeCep = true;
                        }
                    }

                    if (existeCep) {
                        if (enderecoCompleto.length == 5) {
                            enderecoLogradouro = enderecoCompleto[0];
                            enderecoNumeroBairro = enderecoCompleto[1];
                            enderecoCidadeEstado = enderecoCompleto[2];
                            enderecoCep = enderecoCompleto[3];
                            enderecoPais = enderecoCompleto[4];
                        } else if (enderecoCompleto.length == 4) {
                            enderecoLogradouro = enderecoCompleto[0];
                            enderecoNumeroBairro = false;
                            enderecoCidadeEstado = enderecoCompleto[1];
                            enderecoCep = enderecoCompleto[2];
                            enderecoPais = enderecoCompleto[3];
                        } else if (enderecoCompleto.length == 3) {
                            enderecoLogradouro = "";
                            enderecoNumeroBairro = false;
                            enderecoCidadeEstado = enderecoCompleto[0];
                            enderecoCep = enderecoCompleto[1];
                            enderecoPais = enderecoCompleto[2];
                        } else {
                            enderecoPais = "Não permitido";
                        }

                        if (enderecoPais == "Brasil") {
                            myScript.notificacao("Você está em:", results[0].formatted_address, true);
                            var enderecoNunumero = "";
                            var enderecoBairro = "";
                            if (enderecoNumeroBairro !== false) {
                                enderecoNumeroBairro = enderecoNumeroBairro.split(" - ");
                                enderecoNunumero = enderecoNumeroBairro[0];
                                enderecoBairro = enderecoNumeroBairro[1];
                            }
                            enderecoCep = enderecoCep.replace("-", "");
                            $("#usuCep").val(enderecoCep);
                            usuario.pesquisaCep(enderecoCep, "google");
                            $("#endBairro").val(enderecoBairro);
                            if (enderecoLogradouro == "Unnamed Road") {
                                $("#endLogradouro").val("");
                            } else {
                                $("#endLogradouro").val(enderecoLogradouro);
                            }
                            $("#endNumero").val(enderecoNunumero);
                        } else {
                            myScript.notificacao("Selecione uma localização válida (com CEP) e pertencente ao Brasil", "Você selecionou: " + results[0].formatted_address, false);
                        }
                    } else {
                        myScript.notificacao("Selecione uma localização válida (com CEP) e pertencente ao Brasil", "Você selecionou: " + results[0].formatted_address, false);
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
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
}
