import paper from "paper";
import { Car, Location, Level } from "./level";

export function createLevel() {
  const point0 = new paper.Point(
    paper.view.center.x - 200,
    paper.view.center.y - 200,
  );
  const point1 = new paper.Point(
    paper.view.center.x + 200,
    paper.view.center.y + 200,
  );
  const point2 = new paper.Point(
    paper.view.center.x - 200,
    paper.view.center.y + 200,
  );
  const point3 = new paper.Point(
    paper.view.center.x + 200,
    paper.view.center.y - 200,
  );
  const point4 = new paper.Point(
    paper.view.center.x + 400,
    paper.view.center.y + 200,
  );

  const road0 = new paper.Path({
    strokeColor: paper.Color.random(),
    strokeWidth: 10,
    strokeCap: "round",
  });

  road0.add(point0);
  road0.add(point1);
  road0.add(point4);

  const road1 = new paper.Path({
    strokeColor: paper.Color.random(),
    strokeWidth: 10,
    strokeCap: "round",
  });

  road1.add(point2);
  road1.add(point3);

  const location0: Location = new Location(point0);
  const location2: Location = new Location(point2);
  const location3: Location = new Location(point3);
  const location4: Location = new Location(point4);

  const car0: Car = {
    start: location0,
    destination: location2,
  };

  const car1: Car = {
    start: location2,
    destination: location3,
  };

  const test_level: Level = {
    name: "test",
    roads: [road0, road1],
    cars: [car0, car1],
    destinations: [location0, location2, location3, location4],
  };

  return test_level;
}
