var myScript = {
  notificacao: function(subtitle, message, status) {
    var img = "";
    if (status) {
      img = "img/icons/success.png";
    } else {
      img = "img/icons/error.png";
    }
    myApp.addNotification({
      subtitle: subtitle,
      message: message,
      media: '<img width="44" height="44" style="border-radius:100%" src="' +
        img + '">'
    });
  }
};

var storage = window.localStorage;
storage.clear();
