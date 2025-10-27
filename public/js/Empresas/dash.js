function abrirAreaCliente(){
    window.location.href = '/public/telainicial.html';
}

function abrirTelaCriarEvento(){
     window.location.href = '/public/criarEvento.html';

}

//Cadastrar um novo evento
document.getElementById('formEvento').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Lê o objeto salvo no localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const codEmpresa = usuario.cod_empresa;

  if (!codEmpresa) {
    alert('❌ Erro: Empresa não encontrada. Faça o login novamente.');
    return;
  }

  const form = e.target;
  const formData = new FormData(form);
  formData.append('cod_empresa', codEmpresa);

  const submitButton = form.querySelector('.btn-submit');
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
      document.getElementById('modalCriarEvento').classList.remove('active');
      form.reset();
      // carregarEventos(); // opcional, caso queira atualizar a tabela
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

// Abrir modal
document.getElementById('btnCriarEvento').addEventListener('click', () => {
  document.getElementById('modalCriarEvento').classList.add('active');
});

// Fechar modal
document.querySelectorAll('.modal-close, #modalCriarEvento').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === el) document.getElementById('modalCriarEvento').classList.remove('active');
  });
});
