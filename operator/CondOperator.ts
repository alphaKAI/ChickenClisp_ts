import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class CondOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    for (var i: number = 0; i < args.length; ++i) {
      var state = args[i];
      var pred = state[0];
      var expr = state[1];

      if (engine.eval(pred) || pred == "else") {
        return engine.eval(expr);
      }
    }

    return undefined;
  }
}
