import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class LengthOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var obj: Object = engine.eval(args[0]);

    if (obj instanceof Array) {
      return obj.length;
    } else {
      throw new Error("Given object is not an Array or List");
    }
  }
}
