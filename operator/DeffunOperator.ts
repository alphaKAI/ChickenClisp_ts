import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";
import {DynamicOperator} from "../operator/DynamicOperator";

export class DeffunOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var funcName: string   = String(engine.eval(args[0]));
    var funcArgs: string[] = <string[]>args[1];
    var funcBody: Object   = args[2];

    return engine.defineVariable(funcName,  new DynamicOperator(funcArgs, funcBody));
  }
}
