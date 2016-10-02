import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";
import {ImmediateValue} from "../expression/ImmediateValue";

export class AsIVOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return new ImmediateValue(engine.eval(args[0]));
  }
}
