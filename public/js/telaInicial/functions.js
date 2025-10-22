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
      alert('Você já tem uma empresa cadastrada.');
    } else {
      window.location.href = '/public/cadastro_empresa.html';
    }

  } catch (error) {
    console.error('Erro ao verificar empresa:', error);
    alert('Erro de conexão. Não foi possível verificar sua empresa.');
  }
});