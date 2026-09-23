// Recupera o tema antes de a página aparecer.
const pagina = document.documentElement;
let temaSalvo = "claro";

try {
    temaSalvo = localStorage.getItem("tema") || "claro";
} catch (erro) {
    // A troca de tema funciona mesmo se o navegador bloquear o armazenamento.
}

pagina.classList.toggle("tema-escuro", temaSalvo === "escuro");

document.addEventListener("DOMContentLoaded", function () {
    const botaoTema = document.getElementById("alternar-tema");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuBox = document.getElementById("menu-box");
    const menuClose = document.querySelector(".menu-close");

    function atualizarBotao() {
        const escuro = pagina.classList.contains("tema-escuro");
        botaoTema.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
        botaoTema.title = escuro ? "Ativar tema claro" : "Ativar tema escuro";
        botaoTema.setAttribute("aria-pressed", String(escuro));
    }

    function alternarMenu() {
        const aberto = menuBox.classList.toggle("ativo");
        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuBox.setAttribute("aria-hidden", String(!aberto));
    }

    atualizarBotao();
    botaoTema.hidden = false;

    botaoTema.addEventListener("click", function () {
        const escuro = pagina.classList.toggle("tema-escuro");
        atualizarBotao();

        try {
            localStorage.setItem("tema", escuro ? "escuro" : "claro");
        } catch (erro) {
            // Mantém o tema escolhido nesta página, mesmo sem conseguir salvar.
        }
    });

    menuToggle.addEventListener("click", alternarMenu);
    menuClose.addEventListener("click", () => {
        menuBox.classList.remove("ativo");
        menuToggle.setAttribute("aria-expanded", "false");
        menuBox.setAttribute("aria-hidden", "true");
    });

    document.addEventListener("click", function (event) {
        const clicouNoBotao = menuToggle.contains(event.target);
        const clicouNoMenu = menuBox.contains(event.target);

        if (!clicouNoBotao && !clicouNoMenu && menuBox.classList.contains("ativo")) {
            menuBox.classList.remove("ativo");
            menuToggle.setAttribute("aria-expanded", "false");
            menuBox.setAttribute("aria-hidden", "true");
        }
    });
});

// experiencias
const experiencias = document.querySelectorAll(".experiencia-card");

const botaoAnterior = document.querySelector(".experiencia-anterior");
const botaoProximo = document.querySelector(".proxima-experiencia");

const indicadores = document.querySelector(".indicadores-experiencia");

let experienciaAtual = 0;


// Criar indicadores
experiencias.forEach((_, index) => {

    const indicador = document.createElement("span");

    indicador.classList.add("indicador");

    indicador.addEventListener("click", () => {
        mostrarExperiencia(index);
    });

    indicadores.appendChild(indicador);
});


const pontos = document.querySelectorAll(".indicador");
// Mostrar experiência
function mostrarExperiencia(index) {

    experiencias.forEach((experiencia) => {
        experiencia.classList.remove("ativa");
    });

    pontos.forEach((ponto) => {
        ponto.classList.remove("ativo");
    });

    experiencias[index].classList.add("ativa");
    pontos[index].classList.add("ativo");

    experienciaAtual = index;
}
// Próxima experiência
botaoProximo.addEventListener("click", () => {

    experienciaAtual++;

    if (experienciaAtual >= experiencias.length) {
        experienciaAtual = 0;
    }

    mostrarExperiencia(experienciaAtual);
});
// Experiência anterior
botaoAnterior.addEventListener("click", () => {

    experienciaAtual--;

    if (experienciaAtual < 0) {
        experienciaAtual = experiencias.length - 1;
    }

    mostrarExperiencia(experienciaAtual);
});
// Primeira experiência aparece ao carregar
mostrarExperiencia(0);

//para fazer o giro automarico
setInterval(() => {

    experienciaAtual++;

    if (experienciaAtual >= experiencias.length) {
        experienciaAtual = 0;
    }

    mostrarExperiencia(experienciaAtual);

}, 5000);