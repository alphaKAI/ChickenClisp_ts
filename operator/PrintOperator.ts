/// <reference path="../typings/index.d.ts" />



import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class PrintOperator implements IOperator {
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