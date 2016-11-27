reservar = function(mensagem, callback) {
  try {
    $.ajax({
      url: config.getApi() + '/mensagem',
      headers: {
        "idtoken": usuarioController.idToken
      },
      data: mensagem,
      type: "GET",
      dataType: undefined,
      // contentType: "application/json",
      beforeSend: function() {
        myApp.showIndicator();
      },
      success: function(data, status, xhr) {
        callback();
      },
      error: function(data, status, xhr) {
        myScript.notificacao("Erro", data, false);
      },
      complete: function(xhr, status) {
        myApp.hideIndicator();
      }
    });
  } catch (err) {
    alert('Erro reservar: ' + err.message);
  }
};
