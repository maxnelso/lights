import paper from "paper";
import { createLevel } from "./test_level";

paper.setup("canvas");

const level = createLevel();
const intersections = [];
for (let i = 0; i < level.roads.length; i++) {
  for (let j = i + 1; j < level.roads.length; j++) {
    const path0 = level.roads[i];
    const path1 = level.roads[j];
    path0.getIntersections(path1).forEach((e) => intersections.push(e));
  }
}

intersections.forEach(
  (intersection) =>
    new paper.Path.Circle({
      center: intersection.point,
      radius: 15,
      fillColor: "#009dec",
    }),
);
