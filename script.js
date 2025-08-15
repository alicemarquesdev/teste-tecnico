// Script respons�vel pelo formul�rio de inscri��o.
// - Valida os campos Nome e Email
// - Salva dados no localStorage
// - Exibe a lista de inscritos dinamicamente na p�gina

const formulario = document.getElementById("form");

const nomeValido = document.getElementById("validacaoNome");
const emailValido = document.getElementById("validacaoEmail");

// Express�o regular para validar o formato do email
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o carregamento da p�gina

    // Valores inseridos nos campos de Nome e Email
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    // Chama a fun��o que valida os campos e retorna mensagem de sucesso ou de valores inv�lidos
    // Se inv�lidos, a aplica��o para aqui e exibe mensagem de erro, caso v�lido, continua
    if (!validarCamposInputs(nome, email)) {
        return;
    }

    // Localiza a lista de inscritos, se n�o existir, � criado uma lista.
    let listaInscritos = JSON.parse(localStorage.getItem("inscritos")) || [];

    // Adiciona o nome e o email a lista
    listaInscritos.push({ nome, email });

    // Salva a lista no localStorage e converte para JSON
    localStorage.setItem("inscritos", JSON.stringify(listaInscritos));

    // Mostra a lista de inscritos, com o nome e email adicionados
    mostrarInscritos();

    // Limpa os campos do formul�rio
    formulario.reset();

    // Alerta de inscri��o feita com sucesso e rolagem automatica da tela exibindo a lista
    window.alert("Inscri\u00E7\u00E3o feita com sucesso. Confira na lista abaixo!");
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// Fun��o para validar campos do formulario, exibe mensagem de erro ou retorna true/sucesso
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
    // Localiza a lista de inscritos, se n�o existir, � criado uma lista.
    const listaInscritos = JSON.parse(localStorage.getItem("inscritos")) || [];
    // Div que exibir� a lista de inscritos
    const inscritosDiv = document.getElementById("dadosInscritos");

    // Valida��o para verificar se a lista est� vazia
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

// Chama a fun��o para mostrar os inscritos ao carregar a p�gina
mostrarInscritos();
