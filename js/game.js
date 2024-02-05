const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
  "caelus",
  "herta",
  "himeko",
  "jingyuan",
  "kafka",
  "luocha",
  "march",
  "stelle",
  "sw",
  "yanqing",
];

const CreatElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length == 20) {
    clearInterval(this.loop);
    // alert(`Parabens, ${spanPlayer.innerHTML}! Você levou ${timer.innerHTML} segundos para terminar o jogo!`);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter == secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;
    checkCards();
  }

  console.log("action");
};

const creatCard = (character) => {
  const card = CreatElement("div", "card");
  const front = CreatElement("div", "face front");
  const back = CreatElement("div", "face back");

  front.style.backgroundImage = `url(../assets/card_front/${character}.png)`;

  card.appendChild(front);
  card.appendChild(back);

  grid.appendChild(card);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = creatCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
 this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");

  startTimer();
  loadGame();
};
