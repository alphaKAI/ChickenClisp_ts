import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";
import {DynamicOperator} from "../operator/DynamicOperator";

export class DeffunOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var funcName: string   = String(engine.eval(args[0]));
    var funcArgs: string[] = <string[]>args[1];
    var funcBody: Object   = args[2];

    var x: DynamicOperator = new DynamicOperator(funcArgs, funcBody);
    engine.variables[funcName] = x;
    return x;
  }
}
