import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class ConsOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var car: Object = engine.eval(args[0]);
    var cdr: Object = engine.eval(args[1]);

    var ret: Array<any> = [car];

    if (cdr instanceof Array) {
      (<Array<any>>cdr).forEach(elem => ret.push(engine.eval(elem)));
    } else {
      ret.push(cdr);
    }

    return ret;
  }
}
