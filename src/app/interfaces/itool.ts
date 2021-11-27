import { IAlgorithm } from "./ialgorithm";
import { IObject } from "./iobject";

export interface IStep {
  info: string;
  type: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface ITool {
  name: string;
  algorithm: IAlgorithm;
  argsCount: number;
  steps: IStep[];
  
  draw(args: any[], pixels?: number): IObject;
}
