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
								<img src="${restaurante.imagem}" alt="${restaurante.nome}">
								<h3>${restaurante.nome}</h3>
								<p>${restaurante.descricao}</p>
								<button onclick="adicionarFavorito(${restaurante.id})" class="btn btn-primary">Favoritar</button>
						</div>
				`;
				carrossel.appendChild(slide);  // Adiciona o slide no carrossel
		});
}

// Adiciona um restaurante à lista de favoritos
function adicionarFavorito(id) {
		const restaurante = restaurantes.find(r => r.id === id); 
		if (!favoritos.some(r => r.id === id)) {  
				favoritos.push(restaurante);
				renderizarFavoritos();  
				alert(`${restaurante.nome} foi adicionado aos favoritos!`);
		} else {
				alert(`${restaurante.nome} já está nos favoritos!`);
		}
}

// Remove um restaurante dos favoritos
function removerFavorito(id) {
		favoritos = favoritos.filter(r => r.id !== id);  // Filtra a lista para remover o restaurante
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
						<img src="${restaurante.imagem}" alt="${restaurante.nome}">
						<div class="info">
								<h5>${restaurante.nome}</h5>
								<p>${restaurante.localizacao}</p>
								<p><strong>Horário:</strong> ${restaurante.horario}</p>
						</div>
						<button onclick="removerFavorito(${restaurante.id})" class="btn btn-danger">Remover</button>
				`;
				listaFavoritos.appendChild(div);  // Adiciona o restaurante à lista
		});

		// Para manter o layout alinhado se houver apenas um favorito
		if (favoritos.length === 1) {
				const placeholder = document.createElement('div');
				placeholder.style.flex = '1 1 calc(50% - 15px)';
				placeholder.style.visibility = 'hidden';
				listaFavoritos.appendChild(placeholder);
		}
}

// Inicia a busca de restaurantes ao carregar a página
buscarRestaurantes();
