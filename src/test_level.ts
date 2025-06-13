import paper from "paper";
import { Level } from "./level";

export function createLevel() {
  const road0 = new paper.Path({
    strokeColor: paper.Color.random(),
    strokeWidth: 10,
    strokeCap: "round",
  });

  road0.add(
    new paper.Point(paper.view.center.x - 200, paper.view.center.y - 200),
  );
  road0.add(
    new paper.Point(paper.view.center.x + 200, paper.view.center.y + 200),
  );

  const road1 = new paper.Path({
    strokeColor: paper.Color.random(),
    strokeWidth: 10,
    strokeCap: "round",
  });

  road1.add(
    new paper.Point(paper.view.center.x - 200, paper.view.center.y + 200),
  );
  road1.add(
    new paper.Point(paper.view.center.x + 200, paper.view.center.y - 200),
  );

  const test_level: Level = {
    name: "test",
    roads: [road0, road1],
  };
  return test_level;
}
