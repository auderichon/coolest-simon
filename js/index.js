const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const pName = document.getElementById("pName");
const rulesPopin = document.getElementById("rules-popin");
const rules = document.getElementById("rules");
const closeRules = document.getElementsByClassName("close")[0];

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

rules.onclick = function() {
  console.log("click");
  rulesPopin.classList.remove("hidden");
}

closeRules.onclick = function() {
  rulesPopin.classList.add("hidden");
}