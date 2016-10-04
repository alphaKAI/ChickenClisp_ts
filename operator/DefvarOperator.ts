import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class DefvarOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.defineVariable(<string>args[0], engine.eval(args[1]));
  }
}
