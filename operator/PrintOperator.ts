/// <reference path="../typings/index.d.ts" />



import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class PrintOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    args.forEach(arg => {
      process.stdout.write(String(engine.eval(arg)));
    });

    console.log();

    return 0;
  }
}
