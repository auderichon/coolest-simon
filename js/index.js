const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const pName = document.getElementById("pName");

easyBtn.addEventListener("click", () => {
  localStorage.setItem("playerName", pName.value);
  localStorage.setItem("level", "easy");
  window.location.href = "./html/game.html";
});

mediumBtn.addEventListener("click", () => {
  localStorage.setItem("playerName", pName.value);
  localStorage.setItem("level", "medium");
  window.location.href = "./html/game.html";
});

hardBtn.addEventListener("click", () => {
  localStorage.setItem("playerName", pName.value);
  localStorage.setItem("level", "hard");
  window.location.href = "./html/game.html";
});
