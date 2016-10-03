function redimensionaLogoLogin(){
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  $("#logoLogin").css("width", (windowWidth/2));

  var tamanhoImagem = $("#imagem").width();
  tamanhoImagem = (windowWidth - tamanhoImagem) / 2;

  $("#logoLogin").css("margin-left", tamanhoImagem);

}

redimensionaLogoLogin();

window.addEventListener('resize', function(){
	redimensionaLogoLogin();
});
