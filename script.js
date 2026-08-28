const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active");
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");
        const mensagem = document.querySelector("#mensagem");

        if (!nome || !email || !mensagem) return;

        const nomeValue = nome.value.trim();
        const emailValue = email.value.trim();
        const mensagemValue = mensagem.value.trim();

        if (!nomeValue || !emailValue || !mensagemValue) {
            alert("Preencha todos os campos.");
            return;
        }

        const subject = encodeURIComponent(`Contato SnapTask - ${nomeValue}`);

        const body = encodeURIComponent(
            `Nome: ${nomeValue}\nE-mail: ${emailValue}\n\nMensagem:\n${mensagemValue}`
        );

        window.location.href = `mailto:contato@snaptask.app?subject=${subject}&body=${body}`;
    });
}