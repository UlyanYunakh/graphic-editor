export interface IAlgorithm {
  name: string;
  
  compute(agrs: any[], drawFunc: Function, pixelsNumber?: number): void;
}