import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class WhileOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var ret: Object = null;

    while (<boolean>engine.eval(args[0])) {
      ret = engine.eval(args[1]);
    }

    return ret;
  }
}