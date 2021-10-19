import { IAlgorithm } from "../interfaces/ialgorithm";

export class DummyAlgorithm implements IAlgorithm {

  constructor(public name: string) { }

  compute(agrs: []): void {
    // do something dummy
  }
}