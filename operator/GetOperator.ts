import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class GetOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.variables[<string>engine.eval(args[0])];
  }
}