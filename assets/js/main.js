// =========================================================
// CONFIGURAÇÃO — troque aqui o WhatsApp da Rafa
// Formato: 55 + DDD + número, só dígitos. Ex.: 5511987654321
// =========================================================
const WHATSAPP = "5511995403284"; // (11) 99540-3284
const MENSAGEM = "Oi, Rafa! Vim pelo site e gostaria de agendar uma avaliação de fisioterapia domiciliar.";

document.documentElement.classList.add("js");

const linkWhats = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;
document.querySelectorAll("[data-whats]").forEach((a) => {
  a.href = linkWhats;
  a.target = "_blank";
  a.rel = "noopener";
});

const ano = document.querySelector("[data-ano]");
if (ano) ano.textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.getElementById("menu");
const fecharMenu = () => {
  menu.classList.remove("aberto");
  toggle.setAttribute("aria-expanded", "false");
};
toggle.addEventListener("click", () => {
  const abrir = toggle.getAttribute("aria-expanded") !== "true";
  menu.classList.toggle("aberto", abrir);
  toggle.setAttribute("aria-expanded", String(abrir));
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fecharMenu));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });

// Topo com borda e botão flutuante depois do hero
const topo = document.querySelector("[data-topo]");
const flutuante = document.querySelector(".whats-flutuante");
const hero = document.querySelector(".hero");
const aoRolar = () => {
  topo.classList.toggle("rolou", window.scrollY > 10);
  flutuante.classList.toggle("visivel", window.scrollY > hero.offsetHeight * 0.8);
};
window.addEventListener("scroll", aoRolar, { passive: true });
aoRolar();

// Faixa corrida: duplica o conteúdo para o loop ficar contínuo
const faixa = document.querySelector("[data-faixa]");
if (faixa) faixa.innerHTML += faixa.innerHTML;

// Revelar ao rolar + checklist marcando item a item + envelope abrindo
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    const el = entrada.target;
    if (el.matches("[data-envelope]")) {
      el.classList.add("aberto");
    } else {
      el.classList.add("visivel");
      el.querySelectorAll(".checklist li").forEach((li, i) => {
        setTimeout(() => li.classList.add("marcado"), 350 + i * 220);
      });
    }
    observador.unobserve(el);
  });
}, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll("[data-revela], [data-envelope]").forEach((el) => observador.observe(el));

// Atraso em cascata para itens irmãos
document.querySelectorAll(".notas, .envelopes, .passos").forEach((grupo) => {
  [...grupo.children].forEach((filho, i) => { filho.style.transitionDelay = `${i * 90}ms`; });
});
