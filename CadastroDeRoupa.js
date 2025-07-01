$(document).ready(function () {
    $('#form-roupa').on('submit', function (e) {
        e.preventDefault();

        const roupa = {
            roupaNome: $('#nome').val(),
            roupaDescricao: $('#descricao').val(),
            roupaPreco: parseFloat($('#preco').val()),
            roupaUrlImagem: $('#imagem').val(),
            categoriaId: parseInt($('#categoria').val()),
            roupaDestaque: $('#destaque').is(':checked'),
            emEstoque: $('#estoque').is(':checked')
        };

        $.ajax({
            url: 'http://localhost:3000/roupas',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(roupa),
            success: function () {
                alert('Roupa cadastrada com sucesso!');
                $('#form-roupa')[0].reset();
            },
            error: function () {
                alert('Erro ao cadastrar roupa.');
            }
        });
    });
});

function irParaGerenciarRoupas() {
    window.location.href = 'GerenciarRoupas.html';
}