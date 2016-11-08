var config = {

  initialize: function() {
    this.ip = '104.236.59.135';
    //this.ip = '192.168.5.104:3000';
    //this.api = 'https://'+this.ip+'/api/v1';
    this.enderecoImagem = 'http://104.236.59.135:3000/images/';
    //this.api = 'http://104.236.59.135:3000/v1';
    this.api = 'https://' + this.ip + '/api/v1';
    //this.api = 'https://192.168.5.104/api/v1';
    this.apiImagens = 'http://104.236.59.135:3000/v1';
  },

  getApi: function() {
    return this.api;
  },

  getApiImagens: function() {
    return this.apiImagens;
  },

  getEnderecoImagem: function() {
    return this.enderecoImagem;
  },

};
