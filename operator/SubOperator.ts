import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class SubOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var ret: number = Number(engine.eval(args[0]));

    args.slice(1).forEach(arg => {
      var v: Object = engine.eval(arg);
      ret -= Number(v);
    });

    return ret;
  }
}