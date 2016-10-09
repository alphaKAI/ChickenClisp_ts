import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class CdrOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var obj: Object = engine.eval(args[0]);

    if (obj instanceof Array) {
      if ((<Array<any>>obj).length == 1) {
        return [];
      } else if ((<Array<any>>obj).length > 1) {
        return obj.slice(1);
      } else {
        throw new Error("pair required, but got ()");
      }
    }
  }
}
