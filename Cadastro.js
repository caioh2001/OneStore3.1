$(document).ready(function () {
    $('#form-usuario').on('submit', function (e) {
        e.preventDefault();

        const usuario = {
            nome: $('#nome').val(),
            login: $('#email').val(),
            senha: $('#senha').val()
        };

        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(usuario),
            success: function () {
                alert('Usu�rio cadastrado com sucesso!');
                $('#form-usuario')[0].reset();
                window.location.href = 'login.html';
            },
            error: function () {
                $('#mensagem').text('Erro ao cadastrar usu�rio.');
            }
        });
    });

    $('#btn-voltar').on('click', function () {
        window.location.href = 'Login.html'; 
    });
});
