$(document).ready(function () {
    $('#form-roupa').on('submit', function (e) {
        e.preventDefault();

        const roupa = {
            nome: $('#nome').val(),
            descricao: $('#descricao').val(),
        };

        $.ajax({
            url: 'http://localhost:3000/categorias',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(roupa),
            success: function () {
                alert('Categoria cadastrada com sucesso!');
                $('#form-roupa')[0].reset();
            },
            error: function () {
                alert('Erro ao cadastrar roupa.');
            }
        });
    });
});

function irParaGerenciarRoupas() {
    window.location.href = 'GerenciarCategorias.html';
}