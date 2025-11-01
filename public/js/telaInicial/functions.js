// SLIDER
const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[i].classList.add('active');
}

document.getElementById('next').onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

document.getElementById('prev').onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 6000);



const profileIcon = document.getElementById('profileIcon');
const profileSidebar = document.getElementById('profileSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

const modal = document.getElementById('profileModal');
const editProfileBtn = document.getElementById('editProfileBtn'); // Botão dentro da sidebar
const close = document.getElementById('closeModal');

const closeTheSidebar = () => {
  profileSidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
};

profileIcon.onclick = () => {
  profileSidebar.classList.add('active');
  sidebarOverlay.classList.add('active');
};

closeSidebar.onclick = closeTheSidebar;
sidebarOverlay.onclick = closeTheSidebar;


editProfileBtn.onclick = (e) => {
  e.preventDefault(); 
  modal.style.display = 'block';
  closeTheSidebar(); 
};

close.onclick = () => modal.style.display = 'none';

window.onclick = (e) => { 
  if (e.target == modal) {
    modal.style.display = 'none'; 
  }
};


// BOTAO EMPRESARIAL
const empresaBtn = document.querySelector('.empresa-btn');

empresaBtn.addEventListener('click', async () => {
  
  const usuarioString = localStorage.getItem('usuario');
  
  if (!usuarioString) {
    alert('Você precisa estar logado para acessar a área empresarial.');
    window.location.href = '/public/login.html'; 
    return;
  }

  const usuarioLogado = JSON.parse(usuarioString);
  const codColaborador = usuarioLogado.cod_user;

  if (!codColaborador) {
    alert('Erro ao identificar seu usuário. Faça login novamente.');
    localStorage.removeItem('usuario');
    window.location.href = '/public/login.html';
    return;
  }

  try {
    const resposta = await fetch(`http://45.89.30.194:3211/verificar-empresa/${codColaborador}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resposta.ok) {
      throw new Error('Não foi possível verificar os dados da empresa.');
    }

    const data = await resposta.json();

    if (data.temEmpresa) {
      window.location.href = '/public/dashEstabelecimento.html';
    } else {
      window.location.href = '/public/cadastroEmpresarial.html';
    }

  } catch (error) {
    console.error('Erro ao verificar empresa:', error);
    alert('Erro de conexão. Não foi possível verificar sua empresa.');
  }
});

function sairSistema(){
        window.location.href = '/public/index.html';
        localStorage.clear();

}
let eventosCache = []; // Armazena os eventos carregados do backend

async function carregarEventosGerais() {
  const container = document.querySelector('.gallery-container');
  container.innerHTML = '<p style="text-align:center;color:#aaa;">Carregando eventos...</p>';

  try {
    const response = await fetch('http://45.89.30.194:3211/eventos-geral');
    const data = await response.json();

    container.innerHTML = '';
    eventosCache = data; // guarda os eventos no cache

    if (!response.ok || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = `<p style="text-align:center;color:#777;">Nenhum evento disponível no momento.</p>`;
      return;
    }

    renderizarEventos(data);
  } catch (err) {
    console.error('Erro ao carregar eventos gerais:', err);
    container.innerHTML = '<p style="text-align:center;color:red;">Erro ao carregar os eventos.</p>';
  }
}

function renderizarEventos(lista) {
  const container = document.querySelector('.gallery-container');
  container.innerHTML = '';

  if (!lista.length) {
    container.innerHTML = `<p style="text-align:center;color:#777;">Nenhum evento encontrado.</p>`;
    return;
  }

  lista.forEach(evento => {
    const dataFormatada = evento.dt_evento
      ? new Date(evento.dt_evento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      : '-';

    const imagem = evento.link_imagem && evento.link_imagem.trim() !== ''
      ? evento.link_imagem
      : 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';

    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
      <div class="card-banner">
        <img src="${imagem}" alt="${evento.nome_evento}">
      </div>
      <div class="card-content">
        <h3 class="event-name">${evento.nome_evento || 'Evento sem nome'}</h3>
        <div class="event-info">
          <div class="info-item"><i class="ph ph-calendar"></i> ${dataFormatada}</div>
          <div class="info-item"><i class="ph ph-map-pin"></i> ${evento.cidade || 'Local não informado'}</div>
        </div>
        <a class="btn-more">Confirmar Presença</a>
      </div>
    `;
    container.appendChild(card);
  });
}
function aplicarFiltros() {
  const inputBusca = document.querySelector('.search-bar input').value.trim().toLowerCase();
  const selectCidade = document.querySelector('.navigation select').value;

  let filtrados = eventosCache;

  // Filtro por nome do evento
  if (inputBusca !== '') {
    filtrados = filtrados.filter(e =>
      e.nome_evento?.toLowerCase().includes(inputBusca)
    );
  }

  // Filtro por cidade (ignora "Todas cidades")
  if (selectCidade !== 'Todas cidades') {
    filtrados = filtrados.filter(e =>
      e.cidade?.toLowerCase() === selectCidade.toLowerCase()
    );
  }

  renderizarEventos(filtrados);
}

document.addEventListener('DOMContentLoaded', () => {
  carregarEventosGerais();

  document.querySelector('.search-bar input').addEventListener('input', aplicarFiltros);
  document.querySelector('.navigation select').addEventListener('change', aplicarFiltros);
});
