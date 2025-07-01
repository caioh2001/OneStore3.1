function sair() {
  window.location.href = "login.html";
}

const categorias = {
  1: 'Camisa',
  2: 'Vestido',
  3: 'Jaqueta'
};

let roupas = [];
let paginaAtual = 1;
const itensPorPagina = 20;

function carregarRoupas() {
  fetch('http://localhost:3000/roupas') 
    .then(response => response.json())
    .then(data => {
      roupas = data; 
      renderizarTabela(roupas);
    })
    .catch(error => {
      console.error('Erro ao carregar roupas:', error);
      alert('Erro ao carregar dados do servidor.');
    });
}

function renderizarTabela(lista) {
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const roupasPaginadas = lista.slice(inicio, fim);

  const tbody = document.getElementById('tabela-roupas');
  tbody.innerHTML = '';

  roupasPaginadas.forEach(roupa => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${roupa.roupaNome}</td>
      <td>${roupa.roupaPreco}</td>
      <td><input type="checkbox" ${roupa.roupaDestaque ? 'checked' : ''} disabled></td>
      <td><input type="checkbox" ${roupa.emEstoque ? 'checked' : ''} disabled></td>
      <td>${categorias[roupa.categoriaId] || 'N/A'}</td>
      <td class="acoes">
        <a href="#">Editar</a> |
        <a href="#">Detalhes</a> |
        <a href="#" onclick="deletarRoupa('${roupa.id}')">Deletar</a>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filtrar() {
  const termo = document.getElementById('filtro').value.toLowerCase();
  const resultado = roupas.filter(r => r.roupaNome.toLowerCase().includes(termo));
  paginaAtual = 1;
  renderizarTabela(resultado);
}

function mudarPagina(p) {
  paginaAtual = p;
  renderizarTabela(roupas);
}

function paginaAnterior() {
  if (paginaAtual > 1) {
    paginaAtual--;
    renderizarTabela(roupas);
  }
}

function proximaPagina() {
  const totalPaginas = Math.ceil(roupas.length / itensPorPagina);
  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    renderizarTabela(roupas);
  }
}

function irParaCadastroDeRoupa() {
  window.location.href = 'CadastroDeRoupa.html';
}

function deletarRoupa(id) {
  const confirmacao = confirm("Tem certeza que deseja excluir esta roupa?");
  if (!confirmacao) return;

  fetch(`http://localhost:3000/roupas/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      alert("Roupa excluída com sucesso.");
      roupas = roupas.filter(r => r.id !== id);
      renderizarTabela(roupas);
    } else {
      alert("Erro ao excluir roupa.");
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert("Erro ao excluir roupa.");
  });
}

window.onload = carregarRoupas;