import paper from "paper";

export class Location {
  point: paper.Point;
  circle: paper.Path.Circle;

  constructor(point: paper.Point) {
    this.point = point;

    this.circle = new paper.Path.Circle({
      center: this.point,
      radius: 15,
      fillColor: "#06402b",
    });
  }
}

export class Car {
  start: Location;
  destination: Location;
}

export class Level {
  name: string;
  roads: paper.Path[];
  destinations: Location[];
  cars: Car[];
}
