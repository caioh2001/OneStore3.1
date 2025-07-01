  const usuarioLogado = "admin@localhost";

  function gerarIdUnico() {
    return 'carrinho-' + Math.random().toString(36).substr(2, 9);
  }

  function obterCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    if (!carrinho || carrinho.idUsuario !== usuarioLogado) {
      carrinho = {
        idCarrinho: gerarIdUnico(),
        idUsuario: usuarioLogado,
        itens: []
      };
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    return carrinho;
  }

  function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  function adicionarAoCarrinho(roupa) {
    const carrinho = obterCarrinho();

    const jaExiste = carrinho.itens.find(item => item.id === roupa.id);
    if (jaExiste) {
      alert("Essa roupa já está no seu carrinho!");
      return;
    }

    carrinho.itens.push({
      id: roupa.id,
      nome: roupa.roupaNome,
      preco: roupa.roupaPreco,
      imagem: roupa.roupaUrlImagem
    });

    salvarCarrinho(carrinho);
    alert(`"${roupa.roupaNome}" foi adicionada ao carrinho!`);
  }

  fetch('http://localhost:3000/roupas')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('catalogo-container');

      data.forEach(roupa => {
        const card = document.createElement('div');
        card.classList.add('produto');

        card.innerHTML = `
          <img src="${roupa.roupaUrlImagem}" alt="${roupa.roupaNome}">
          <h2>${roupa.roupaNome}</h2>
          <p class="preco">Preço: R$ ${roupa.roupaPreco.toFixed(2)}</p>
          <br/>
          <div class="botoes">
            <button class="detalhes">Detalhes</button>
            <button class="carrinho">Incluir no carrinho</button>
          </div>
        `;

        const botaoCarrinho = card.querySelector('.carrinho');
        botaoCarrinho.addEventListener('click', () => {
          adicionarAoCarrinho(roupa);
        });

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar catálogo:', error);
      document.getElementById('catalogo-container').innerText = 'Erro ao carregar catálogo.';
    });
