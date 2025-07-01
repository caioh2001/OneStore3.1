$(document).ready(function () {
    $('#form-login').on('submit', function (e) {
        e.preventDefault();

        const login = $('#login').val();
        const senha = $('#senha').val();

        $.ajax({
            url: `http://localhost:3000/login?login=${login}&senha=${senha}`,
            method: 'GET',
            success: function (data) {
                if (data.length > 0) {
                    if (login == 'admin@onestore.com') {
                        window.location.href = 'PaginaAdmin.html';
                    }
                    else {
                        window.location.href = 'Catalogo.html';
                    }
                } else {
                    $('#mensagem').text('Usu�rio ou senha incorretos.');
                }
            },
            error: function () {
                $('#mensagem').text('Erro na conex�o com o servidor.');
            }
        });
    });
});

$('#btn-cadastro').on('click', function () {
    window.location.href = 'Cadastro.html';
});