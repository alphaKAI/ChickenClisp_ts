import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class SetOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.setVariable(<string>args[0], engine.eval(args[1]));
  }
}
