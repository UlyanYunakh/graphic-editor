import { IAlgorithm } from "./ialgorithm";

export interface ITool {
  id: number;
  name: string;
  algorithm: IAlgorithm;
  
  draw(args: []): void;
}
