import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class GetfunOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.variables[<string>engine.eval(args[0])];
  }
}
