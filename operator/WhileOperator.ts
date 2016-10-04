import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class WhileOperator extends Operator implements IOperator {
  /**
   * Loop while the condition is true.
   */
  public call(engine: Engine, args: Array<any>): Object {
    var ret: Object = null;

    while (<boolean>engine.eval(args[0])) {
      ret = engine.eval(args[1]);
    }

    return ret;
  }
}
