import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class DivOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var ret: number = Number(engine.eval(args[0]));

    args.slice(1).forEach(arg => {
      var v: Object = engine.eval(arg);
      ret /= Number(v);
    });

    return ret;
  }
}
