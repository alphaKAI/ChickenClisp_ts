import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class IsListOperator extends Operator implements IOperator {
  /**
   * Loop while the condition is true.
   */
  public call(engine: Engine, args: Array<any>): Object {
    if (engine.eval(args[0]) instanceof Array) {
      return true;
    } else {
      return false;
    }
  }
}
