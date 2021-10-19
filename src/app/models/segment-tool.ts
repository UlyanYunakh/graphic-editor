import { IAlgorithm } from "../interfaces/ialgorithm";
import { ITool } from "../interfaces/itool";

export class SegmentTool implements ITool {
  id = 0;
  name = 'Segment';

  constructor(public algorithm: IAlgorithm) { }

  draw(args: []): void {
    this.algorithm.compute(args);
  }
}
