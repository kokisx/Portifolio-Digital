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

    function atualizarBotao() {
        const escuro = pagina.classList.contains("tema-escuro");
        botaoTema.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
        botaoTema.title = escuro ? "Ativar tema claro" : "Ativar tema escuro";
        botaoTema.setAttribute("aria-pressed", String(escuro));
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
});
