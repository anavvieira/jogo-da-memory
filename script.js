const imagens = [
  "images/BMO.jpeg",
  "images/Conde.jpeg",
  "images/Finn.jpeg",
  "images/Fogo.jpeg",
  "images/Jake.jpeg",
  "images/Jujuba.jpeg",
  "images/Marceline.jpeg",
  "images/Pinguim.jpeg"
];

const container = document.getElementById("container-cartas");
let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false;
let tentativas = 0;

function embaralhar(array) {
  return array.sort(() => 0.5 - Math.random());
}

function criarCarta(url) {
  const carta = document.createElement("div");
  carta.classList.add("card");
  carta.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back" style="background-image: url('${url}');"></div>
    </div>
  `;
  carta.addEventListener("click", virarCarta);
  return carta;
}

function virarCarta() {
  if (bloqueio) return;
  if (this === primeiraCarta) return;

  this.classList.add("flipped");

  if (!primeiraCarta) {
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;
  tentativas++;
  document.getElementById("contador").innerText = tentativas;

  checarPar();
}

function checarPar() {
  const primeiraImg = primeiraCarta.querySelector(".card-back").style.backgroundImage;
  const segundaImg = segundaCarta.querySelector(".card-back").style.backgroundImage;

  if (primeiraImg === segundaImg) {
    primeiraCarta.removeEventListener("click", virarCarta);
    segundaCarta.removeEventListener("click", virarCarta);
    resetar();
    checarFim();
  } else {
    bloqueio = true;
    setTimeout(() => {
      primeiraCarta.classList.remove("flipped");
      segundaCarta.classList.remove("flipped");
      resetar();
    }, 1000);
  }
}

function resetar() {
  [primeiraCarta, segundaCarta, bloqueio] = [null, null, false];
}

function checarFim() {
  const todasViradas = document.querySelectorAll(".card.flipped");
  if (todasViradas.length === cartas.length) {
    setTimeout(() => alert(`Parabéns! Você venceu em ${tentativas} tentativas.`), 500);
  }
}

function iniciarJogo() {
  const cartasDuplicadas = [...imagens, ...imagens];
  cartas = embaralhar(cartasDuplicadas);

  cartas.forEach((url) => {
    const carta = criarCarta(url);
    container.appendChild(carta);
  });
}

iniciarJogo();
