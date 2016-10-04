import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";
import {ImmediateValue} from "../expression/ImmediateValue";

export class AsIVOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return new ImmediateValue(engine.eval(args[0]));
  }
}
