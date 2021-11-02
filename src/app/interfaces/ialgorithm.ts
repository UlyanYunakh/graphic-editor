export interface IAlgResult {
  table: any[];
  pixelNumber: number;
}

export interface IAlgorithm {
  name: string;
  
  compute(agrs: any[], drawFunc: Function, pixelsNumber?: number): IAlgResult;
  getTableColumns(): string[];
}