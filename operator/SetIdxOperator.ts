import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";
import {ImmediateValue} from "../expression/ImmediateValue";

export class SetIdxOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    if (!(args[0] instanceof ImmediateValue) && !(args[0].value instanceof Array)) {
      throw new Error("set-idx requires array");
    }
    var arr: Array<any> = args[0].value;
    var idx: number     = args[1];
    var value: any      = args[2];

    if (0 < idx && idx < arr.length) {
      arr[idx] = value;

      return new ImmediateValue(arr);
    } else {
      throw new Error("Invalid")
    }
  }
}
