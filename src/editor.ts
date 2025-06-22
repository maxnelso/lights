import paper from "paper";

let currentPath = null;

function resetPath() {
  currentPath = new paper.Path({
    strokeColor: paper.Color.random(),
    strokeWidth: 10,
    strokeCap: "round",
  });
}

function addPoint(x, y) {
  currentPath.add(new paper.Point(x, y));
}

addEventListener("keydown", function (event) {
  console.log(event.key);
  switch (event.key) {
    case "Escape":
      paper.project.clear();
      resetPath();
      break;
    case "Enter":
      console.log(currentPath);
      resetPath();
      break;
    default:
      console.log("Unhandled key");
  }
});

addEventListener("mousedown", function (event) {
  console.log(event.button, event.clientX, event.clientY);
  switch (event.button) {
    case 0:
      addPoint(event.clientX, event.clientY);
      break;
    default:
      console.log("Unknown mousedown");
  }
});
