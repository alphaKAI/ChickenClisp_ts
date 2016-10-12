import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class CarOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var obj: Object = engine.eval(args[0]);

    if (obj instanceof Array) {
      if ((<Array<any>>obj).length >= 1) {
        return obj[0];
      } else {
        throw new Error("pair required, but got ()");
      }
    }
  }
}
