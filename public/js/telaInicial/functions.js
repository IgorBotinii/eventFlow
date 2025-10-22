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