import {Engine} from "./Engine";
import {IOperator} from "./operator/IOperator";

export class Closure {
  private engine: Engine;
  private operator: IOperator;

  constructor(engine: Engine, operator: IOperator) {
    this.engine   = engine;
    this.operator = operator;
  }

  public eval(args: Array<any>): Object{
    return this.operator.call(this.engine, args);
  }
}
