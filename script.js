const carrossel = document.getElementById('carousel-items');
const listaFavoritos = document.getElementById('favorite-list');
let favoritos = [];
let restaurantes = [];

// Busca os dados dos restaurantes a partir do JSON
function buscarRestaurantes() {
    fetch('./restaurantes.json')
        .then(resposta => resposta.json())
        .then(dados => {
            restaurantes = dados; 
            criarCarrossel();  
        })
        .catch(erro => console.error('Erro ao carregar restaurantes:', erro));
}

// Cria os slides do carrossel
function criarCarrossel() {
    restaurantes.forEach((restaurante, indice) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        if (indice === 0) slide.classList.add('active');  

        slide.innerHTML = `
            <div class="restaurant-card">
                <img src="${restaurante.imagem}" alt="${restaurante.nome_restaurante}">
                <h3>${restaurante.nome_restaurante}</h3>
                <p>${restaurante.tipo_culinaria}</p>
                <p><strong>Localização:</strong> ${restaurante.localizacao.endereco}</p>
                <p><strong>Avaliação:</strong> ${restaurante.avaliacao} ⭐ (${restaurante.numero_avaliacoes} avaliações)</p>
                <p><strong>Horário:</strong> ${restaurante.horario_funcionamento.dias.join(' a ')} - ${restaurante.horario_funcionamento.abertura} às ${restaurante.horario_funcionamento.fechamento}</p>
                <p><strong>Contato:</strong> ${restaurante.contato.telefone}</p>
                <button onclick="adicionarFavorito(${restaurante.id})" class="btn btn-primary">Favoritar</button>
                <a href="${restaurante.acoes_rapidas.link_menu}" class="btn btn-secondary" target="_blank">Ver Menu</a>
                <a href="${restaurante.acoes_rapidas.link_reserva}" class="btn btn-secondary" target="_blank">Reservar</a>
            </div>
        `;
        carrossel.appendChild(slide);
    });
}

// Adiciona um restaurante à lista de favoritos
function adicionarFavorito(id) {
    const restaurante = restaurantes.find(r => r.id === id); 
    if (!favoritos.some(r => r.id === id)) {  
        favoritos.push(restaurante);
        renderizarFavoritos();  
        alert(`${restaurante.nome_restaurante} foi adicionado aos favoritos!`);
    } else {
        alert(`${restaurante.nome_restaurante} já está nos favoritos!`);
    }
}

// Remove um restaurante dos favoritos
function removerFavorito(id) {
    favoritos = favoritos.filter(r => r.id !== id); 
    renderizarFavoritos();  
    alert("Restaurante removido dos favoritos.");
}

// Renderiza a lista de favoritos
function renderizarFavoritos() {
    listaFavoritos.innerHTML = '';  
    listaFavoritos.style.display = 'flex';
    listaFavoritos.style.flexWrap = 'wrap';
    listaFavoritos.style.gap = '15px';

    favoritos.forEach((restaurante) => {
        const div = document.createElement('div');
        div.classList.add('col-md-6', 'favorite-card');

        div.innerHTML = `
            <img src="${restaurante.imagem}" alt="${restaurante.nome_restaurante}">
            <div class="info">
                <h5>${restaurante.nome_restaurante}</h5>
                <p>${restaurante.tipo_culinaria}</p>
                <p><strong>Localização:</strong> ${restaurante.localizacao.endereco}</p>
                <p><strong>Horário:</strong> ${restaurante.horario_funcionamento.dias.join(' a ')} - ${restaurante.horario_funcionamento.abertura} às ${restaurante.horario_funcionamento.fechamento}</p>
                <p><strong>Contato:</strong> ${restaurante.contato.telefone}</p>
                <a href="${restaurante.acoes_rapidas.link_menu}" class="btn btn-secondary" target="_blank">Ver Menu</a>
                <a href="${restaurante.acoes_rapidas.link_reserva}" class="btn btn-secondary" target="_blank">Reservar</a>
                <button onclick="removerFavorito(${restaurante.id})" class="btn btn-danger">Remover</button>
            </div>
        `;
        listaFavoritos.appendChild(div);
    });
}

// Inicia a busca de restaurantes ao carregar a página
buscarRestaurantes();
