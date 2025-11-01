// ============================
// 🌐 Funções de navegação
// ============================
function abrirAreaCliente() {
  window.location.href = '/public/telainicial.html';
}

function abrirTelaCriarEvento() {
  window.location.href = '/public/criarEvento.html';
}

// ============================
// 📅 Cadastro de Novo Evento
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const formEvento = document.getElementById('formEvento');
  const modalCriarEvento = document.getElementById('modalCriarEvento');
  const btnCriarEvento = document.getElementById('btnCriarEvento');

  // 🔹 Abre o modal de criação de evento
  if (btnCriarEvento) {
    btnCriarEvento.addEventListener('click', () => {
      modalCriarEvento.classList.add('active');
    });
  }

  // 🔹 Fecha o modal ao clicar fora ou no botão X
  document.querySelectorAll('.modal-close, #modalCriarEvento').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el) modalCriarEvento.classList.remove('active');
    });
  });

  // 🔹 Envia o formulário de cadastro
  if (formEvento) {
    formEvento.addEventListener('submit', async e => {
      e.preventDefault();

      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      const codEmpresa = usuario.cod_empresa;

      if (!codEmpresa) {
        alert('❌ Erro: Empresa não encontrada. Faça o login novamente.');
        return;
      }

      const formData = new FormData(formEvento);
      formData.append('cod_empresa', codEmpresa);

      const submitButton = formEvento.querySelector('.btn-submit');
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="ph ph-spinner-gap"></i> Cadastrando...';

      try {
        const response = await fetch('http://45.89.30.194:3211/cadastrar-evento', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          alert('✅ Evento cadastrado com sucesso!');
          modalCriarEvento.classList.remove('active');
          formEvento.reset();
        } else {
          alert('❌ Erro: ' + (data.message || 'Falha ao cadastrar.'));
        }
      } catch (err) {
        console.error('Erro ao enviar:', err);
        alert('Erro de conexão ao cadastrar o evento.');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="ph ph-check-circle"></i> Cadastrar Evento';
      }
    });
  }
});
