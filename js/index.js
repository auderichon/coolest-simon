const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const pName = document.getElementById("pName");
const rulesPopin = document.getElementById("rules-popin");
const rules = document.getElementById("rules");
const closeRules = document.getElementsByClassName("close")[0];
const creditsPopin = document.getElementById("credits-popin");
const credits = document.getElementById("credits");
const closeCredits = document.getElementsByClassName("close")[1];

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

rules.onclick = function () {
  console.log("click");
  rulesPopin.classList.remove("hidden");
};

closeRules.onclick = function () {
  rulesPopin.classList.add("hidden");
};

credits.onclick = function () {
  console.log("click");
  creditsPopin.classList.remove("hidden");
};

closeCredits.onclick = function () {
  creditsPopin.classList.add("hidden");
};
