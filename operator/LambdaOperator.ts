import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";
import {DynamicOperator} from "../operator/DynamicOperator";

export class LambdaOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var funcArgs: string[] = <string[]>args[0];
    var funcBody: Object   = args[1];

    return new DynamicOperator(funcArgs, funcBody);
  }
}
