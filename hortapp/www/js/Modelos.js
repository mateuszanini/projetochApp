var UsuarioModel = function() {
  this.usuEmail = null;
  this.usuNome = null;
  this.usuImagem = null;
  this.usuIdGoogle = null;
  this.usuTokenFcm = null;
  this.endCodigo = null;
  this.usuEndVisivel = null;
  this.usuTelefone = null;
  this.usuTelefoneVisivel = null;
};

var EnderecoModel = function() {
  this.endLogradouro = null;
  this.endBairro = null;
  this.endNumero = null;
  this.endCep = null;
  this.cidCodigo = null;
  this.ufCodigo = null;
  this.endLatitude = null;
  this.endLongitude = null;
};

var OfertaModel = function() {
  this.oftCodigo = null;
  this.usuCodigo = null;
  this.itmCodigo = null;
  this.oftImagem = null;
  this.oftQuantidade = null;
  this.oftValor = null;
  this.oftDataInicial = null;
  this.oftDataFinal = null;
  this.endCodigo = null;
  this.stsCodigo = null;
  this.oftObs = null;
  this.endereco = new EnderecoModel();
};
