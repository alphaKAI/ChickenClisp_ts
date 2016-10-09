import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class ConsOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var car: Object = engine.eval(args[0]);
    var cdr: Object = engine.eval(args[1]);

    return [car, cdr];
  }
}
