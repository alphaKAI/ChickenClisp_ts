import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class StepOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var ret: Object = null;

    args.forEach(arg => {
      ret = engine.eval(arg);
    });

    return ret;
  }
}
