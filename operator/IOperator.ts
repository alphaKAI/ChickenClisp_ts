import { Engine } from '../Engine';

export interface IOperator {
  call(engine: Engine, args: Array<any>): Object;
}

export class Operator {} 
