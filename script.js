// Script responsável pelo formulário de inscrição.
// - Valida os campos Nome e Email
// - Salva dados no localStorage
// - Exibe a lista de inscritos dinamicamente na página

const formulario = document.getElementById("form");

const nomeValido = document.getElementById("validacaoNome");
const emailValido = document.getElementById("validacaoEmail");

// Expressão regular para validar o formato do email
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o carregamento da página

    // Valores inseridos nos campos de Nome e Email
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    // Chama a função que valida os campos e retorna mensagem de sucesso ou de valores inválidos
    // Se inválidos, a aplicação para aqui e exibe mensagem de erro, caso válido, continua
    if (!validarCamposInputs(nome, email)) {
        return;
    }

    // Localiza a lista de inscritos, se não existir, é criado uma lista.
    let listaInscritos = JSON.parse(localStorage.getItem("inscritos")) || [];

    // Adiciona o nome e o email a lista
    listaInscritos.push({ nome, email });

    // Salva a lista no localStorage e converte para JSON
    localStorage.setItem("inscritos", JSON.stringify(listaInscritos));

    // Mostra a lista de inscritos, com o nome e email adicionados
    mostrarInscritos();

    // Limpa os campos do formulário
    formulario.reset();

    // Alerta de inscrição feita com sucesso e rolagem automatica da tela exibindo a lista
    window.alert("Inscri\u00E7\u00E3o feita com sucesso. Confira na lista abaixo!");
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// Função para validar campos do formulario, exibe mensagem de erro ou retorna true/sucesso
function validarCamposInputs(nome, email) {
    // Limpa mensagens antigas
    nomeValido.textContent = "";
    emailValido.textContent = "";

    let valido = true;

    if (nome === "") {
        nomeValido.textContent = "Por favor, preencha o campo de nome.";
        nomeValido.style.color = "red";
        valido = false;
    }

    if (!regexEmail.test(email)) {
        emailValido.textContent = "Por favor, insira um email v\u00E1lido.";
        emailValido.style.color = "red";
        valido = false;
    }

    return valido;
}

// Mostra lista de inscritos 
function mostrarInscritos() {
    // Localiza a lista de inscritos, se não existir, é criado uma lista.
    const listaInscritos = JSON.parse(localStorage.getItem("inscritos")) || [];
    // Div que exibirá a lista de inscritos
    const inscritosDiv = document.getElementById("dadosInscritos");

    // Validação para verificar se a lista está vazia
    if (listaInscritos.length === 0) {
        inscritosDiv.textContent = "Nenhum inscrito.";
        return;
    }

    // Exibe a lista de inscritos dinamicamente, com o nome e email
    inscritosDiv.innerHTML = listaInscritos.map((item, index) =>
        `<p><strong>${index + 1} - Nome:</strong> ${item.nome} - 
         <strong>Email:</strong> ${item.email}</p>
         <hr>`
    ).join("");
}

// Chama a função para mostrar os inscritos ao carregar a página
mostrarInscritos();
