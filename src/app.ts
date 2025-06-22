import paper from "paper";
import { createLevel } from "./test_level";
import { floydWarshall } from "./floyd_warshall";

paper.setup("canvas");

const level = createLevel();
const edges = new Map<string, paper.Point[]>();
const nodes: paper.Point[] = [];
level.roads.forEach((road) => {
  road.segments.forEach((segment) => {
    nodes.push(segment.point);
    edges.set(segment.point.toString(), []);
  });
});

function pointsOnLine(
  point0: paper.Point,
  point1: paper.Point,
  point2: paper.Point,
) {
  return (
    point0.getDistance(point2) + point1.getDistance(point2) ==
    point0.getDistance(point1)
  );
}

for (let i = 0; i < level.roads.length; i++) {
  for (let j = 0; j < level.roads.length; j++) {
    if (i == j) {
      continue;
    }
    const path0 = level.roads[i];
    const path1 = level.roads[j];
    path0.getIntersections(path1).forEach((intersection) => {
      let containsIntersection = false;
      nodes.forEach((node: paper.Point) => {
        if (node.equals(intersection.point)) {
          containsIntersection = true;
        }
      });
      if (!containsIntersection) {
        nodes.push(intersection.point);
      }
      path0.segments.forEach((segment) => {
        if (segment.next === null) {
          return;
        }

        if (
          pointsOnLine(segment.point, segment.next.point, intersection.point)
        ) {
          if (!edges.has(intersection.point.toString())) {
            edges.set(intersection.point.toString(), []);
          }
          edges.get(intersection.point.toString()).push(segment.next.point);
          edges.get(intersection.point.toString()).push(segment.point);
          edges.get(segment.point.toString()).push(intersection.point);
          edges.get(segment.next.point.toString()).push(intersection.point);
        } else {
          edges.get(segment.point.toString()).push(segment.next.point);
          edges.get(segment.next.point.toString()).push(segment.point);
        }
      });
    });
  }
}

const shortestPaths = floydWarshall(nodes, edges);
console.log("shortest paths", shortestPaths);
