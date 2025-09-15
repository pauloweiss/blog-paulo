// Lista de posts (pode ser expandida)
const posts = [
	{ file: 'posts/1sample-post.html', title: 'Uma Análise Comparativa em Tecnologias e Aplicações Emergentes em Bancos de Dados' },
	{ file: 'posts/sample-post.html', title: 'Exemplo de Post 1' }
];

// Referências aos elementos DOM
const searchBar = document.getElementById('search-bar');
const postsContainer = document.getElementById('posts-container');
// Função para carregar e renderizar posts HTML
async function loadPosts(query = '') {
	postsContainer.innerHTML = '';
	for (const post of posts) {
		try {
			const response = await fetch(post.file);
			if (!response.ok) throw new Error('Erro ao carregar post');
			const html = await response.text();
			if (post.title.toLowerCase().includes(query.toLowerCase()) ||
					html.toLowerCase().includes(query.toLowerCase())) {
				const postElement = document.createElement('article');
				postElement.classList.add('post');
				postElement.innerHTML = `
					<h3>${post.title}</h3>
					${html}
				`;
				postsContainer.appendChild(postElement);
			}
		} catch (error) {
			console.error(`Erro ao carregar ${post.file}:`, error);
		}
	}
}
// Carregar posts ao iniciar excluido

// Adicionar evento de busca
if (searchBar) {
	searchBar.addEventListener('input', (e) => {
		loadPosts(e.target.value);
	});
}
