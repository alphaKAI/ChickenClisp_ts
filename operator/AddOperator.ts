import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class AddOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var ret: number = 0;

    args.forEach(arg => {
      var v: Object = engine.eval(arg);
      ret += Number(v);
    });

    return ret;
  }
}
