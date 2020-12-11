const audio = document.querySelector("audio");
const draggables = document.querySelectorAll(".draggable");
const container = document.querySelector("#container");
const answers = document.querySelector(".answers");
const title = document.querySelector("#title");

// AUDIO PLAYER
audio.addEventListener("play", function() {
  console.log("playing");
});

audio.addEventListener("ended", function() {
  console.log("ended");
});

//DRAG AND DROP
draggables.forEach(draggable => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

container.addEventListener("dragenter", function(e) {
  e.preventDefault();
  this.style.border = "2px dashed black";
});

container.addEventListener("dragover", function(e) {
  e.preventDefault();
});

container.addEventListener("drop", function(e) {
  e.preventDefault();
  title.remove();

  const child = container.children;
  const answer = document.querySelector(".dragging");
  answers.removeChild(answer);
  container.appendChild(answer);

  if (child.length > 1) {
    answers.appendChild(child[0]);
  }

  this.style.border = "none";
});
