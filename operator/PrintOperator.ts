/// <reference path="../typings/index.d.ts" />

import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class PrintOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    args.forEach(arg => {
      var item: Object = engine.eval(arg);

      if (item instanceof Operator) {
        item = arg;
      }

      if (item instanceof Array) {
        process.stdout.write("(");
        process.stdout.write(item.join(" "))
        process.stdout.write(")");
      } else {
        process.stdout.write(item.toString());
      }
    });

    return 0;
  }
}

export class PrintlnOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    args.forEach(arg => {
      var item: Object = engine.eval(arg);

      if (item instanceof Operator) {
        item = arg;
      }

      if (item instanceof Array) {
        process.stdout.write("(");
        process.stdout.write(item.join(" "))
        process.stdout.write(")");
      } else {

        process.stdout.write(item.toString());
      }
    });

    console.log();

    return 0;
  }
}
