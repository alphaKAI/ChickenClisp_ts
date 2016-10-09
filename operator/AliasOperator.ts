import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class AliasOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var _new: string = <string>args[0];
    var base: string = <string>args[1];

    var v = engine.variables[base];

    if (v != undefined) {
      engine.variables[_new] = v;
    }

    return v;
  }
}
