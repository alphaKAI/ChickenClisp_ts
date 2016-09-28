import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class SetOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var value: Object = engine.eval(args[1]);
    engine.variables[args[0]] = value;

    return value;
  }
}