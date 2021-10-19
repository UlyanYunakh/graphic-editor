export interface IAlgorithm {
  name: string;
  
  compute(agrs: []): void;
}