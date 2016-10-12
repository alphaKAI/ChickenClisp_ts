import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class WhenOperator extends Operator implements IOperator {
  /**
   * Loop while the condition is true.
   */
  public call(engine: Engine, args: Array<any>): Object {
    if (<boolean>engine.eval(args[0])) {
      var ret: Object = null;

      args.slice(1).forEach(arg => {
        ret = engine.eval(arg);
      });

      return ret;
    } else {
      return undefined;
    }
  }
}
