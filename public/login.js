document.getElementById("loginForm").addEventListener("submit", function (e) {
e.preventDefault();

const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;

if (email === "" || senha === "") {
alert("Preencha todos os campos!");
} else {
alert("Login efetuado com sucesso!");
window.location.href = ""; //colocar caminho apos efetuar login
}
});