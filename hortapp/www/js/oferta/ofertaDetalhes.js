var ofertaDetalhes = function(oftCodigo) {
  ofertaController.getById(oftCodigo, function(dados) {
    alert(JSON.stringify(dados));
  })
};
