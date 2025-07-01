
  function sair() {
    window.location.href = "login.html";
  }

  let categorias = [];
  let paginaAtual = 1;
  const itensPorPagina = 5;

  function carregarCategorias() {
    fetch('http://localhost:3000/categorias')
      .then(response => response.json())
      .then(data => {
        categorias = data;
        renderizarTabela(categorias);
      })
      .catch(error => {
        console.error('Erro ao carregar categorias:', error);
        alert('Erro ao carregar categorias do servidor.');
      });
  }

  function renderizarTabela(lista) {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const categoriasPaginadas = lista.slice(inicio, fim);

    const tbody = document.getElementById('tabela-categorias');
    tbody.innerHTML = '';

    categoriasPaginadas.forEach(cat => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cat.nome}</td>
        <td>${cat.descricao}</td>
        <td class="acoes">
          <a href="#">Editar</a> |
          <a href="#" onclick="deletarCategoria('${cat.id}')">Deletar</a>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function filtrar() {
    const termo = document.getElementById('filtro').value.toLowerCase();
    const resultado = categorias.filter(c => c.nome.toLowerCase().includes(termo));
    paginaAtual = 1;
    renderizarTabela(resultado);
  }

  function mudarPagina(p) {
    paginaAtual = p;
    renderizarTabela(categorias);
  }

  function paginaAnterior() {
    if (paginaAtual > 1) {
      paginaAtual--;
      renderizarTabela(categorias);
    }
  }

  function proximaPagina() {
    const totalPaginas = Math.ceil(categorias.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      renderizarTabela(categorias);
    }
  }

  function irParaCadastroDeCategoria() {
    window.location.href = 'CadastroDeCategoria.html';
  }

  function deletarCategoria(id) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

    fetch(`http://localhost:3000/categorias/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        alert('Categoria excluída com sucesso.');
        categorias = categorias.filter(c => c.id !== id);
        renderizarTabela(categorias);
      } else {
        alert('Erro ao excluir categoria.');
      }
    })
    .catch(error => {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir categoria.');
    });
  }

  window.onload = carregarCategorias;