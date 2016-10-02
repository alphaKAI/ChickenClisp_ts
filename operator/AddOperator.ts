import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class AddOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var ret = 0;

    args.forEach(arg => {
      var v: Object = engine.eval(arg);
      ret += Number(v);
    });

    return ret;
  }
}
