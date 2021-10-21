import { IAlgorithm } from "./ialgorithm";

export interface ITool {
  id: number;
  name: string;
  algorithm: IAlgorithm;
  argsCount: number;
  
  draw(args: any[]): void;
}
