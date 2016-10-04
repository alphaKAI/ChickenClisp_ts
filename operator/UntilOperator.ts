import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class UntilOperator extends Operator implements IOperator {
  /**
   * Loop while the condition is false
   */
  public call(engine: Engine, args: Array<any>): Object {
    var ret: Object = null;

    while (!<boolean>engine.eval(args[0])) {
      ret = engine.eval(args[1]);
    }

    return ret;
  }
}
