/*function redimensionaLogoLogin(){
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
});*/

function mostraMapa() {
    /*$('.btnLocalizacaoAtual').toggleClass('button-fill');*/
    $('.divisor').toggleClass('animated zoomOut');
    $('.divisor').toggleClass('animated zoomIn');
    $('.mapa').toggleClass('hide');
    $('.mapa').toggleClass('animated zoomIn');
}

jQuery(function($){
  var endereco =
  [
    {
      "sigla": "AC",
      "nome": "Acre",
      "cidades": [
        "Acrelândia",
        "Assis Brasil",
        "Brasiléia",
        "Bujari",
        "Capixaba",
        "Cruzeiro do Sul",
        "Epitaciolândia",
        "Feijó",
        "Jordão",
        "Mâncio Lima",
        "Manoel Urbano",
        "Marechal Thaumaturgo",
        "Plácido de Castro",
        "Porto Acre",
        "Porto Walter",
        "Rio Branco",
        "Rodrigues Alves",
        "Santa Rosa do Purus",
        "Sena Madureira",
        "Senador Guiomard",
        "Tarauacá",
        "Xapuri"
      ]
    }];
   $("input[name='cep']").change(function(){
      var cep_code = $(this).val();
      if( cep_code.length <= 0 ) return;
      $.get("http://apps.widenet.com.br/busca-cep/api/cep.json", { code: cep_code },
         function(result){
            if( result.status!=1 ){
               alert(result.message || "Houve um erro desconhecido");
               return;
            }
            console.log(result);
            /*$("input#cep").val( result.code );
            $("input#estado").val( result.state );
            $("input#cidade").val( result.city );
            $("input#bairro").val( result.district );
            $("input#endereco").val( result.address );
            $("input#estado").val( result.state );*/
         });
   });
});

/* MÁSCARAS DE INPUTS */
