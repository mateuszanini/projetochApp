function listaEstados() {
    var strUf = '';
    for (var i = 0; i < uf.length; i++) {
        if (uf[i].ufSigla == "SC") {
            strUf += '<option value="' + uf[i].ufSigla + '"selected>' + uf[i].ufNome + '</option>';
        } else {
            strUf += '<option value="' + uf[i].ufSigla + '">' + uf[i].ufNome + '</option>';
        }
    }
    $("#uf").html(strUf);
}

function listaCidades() {
    var ufSelecionado = $("#uf").val();
    var strCidade = '';
    for (var i = 0; i < uf.length; i++) {
        if (uf[i].ufSigla == ufSelecionado) {
            for (var j = 0; j < uf[i].cidades.length; j++) {
                if (j === 0) {
                    strCidade += '<option value="' + uf[i].cidades[j].cidCodigo + '"selected>' + uf[i].cidades[j].cidNome + '</option>';
                    $("#cidadeSelecionada").html(uf[i].cidades[j].cidNome);
                } else {
                    strCidade += '<option value="' + uf[i].cidades[j].cidCodigo + '">' + uf[i].cidades[j].cidNome + '</option>';
                }
            }
        }
    }
    $("#cidade").html(strCidade);
}
