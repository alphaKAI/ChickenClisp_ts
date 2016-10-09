import {Engine} from "../Engine";
import {Closure} from "../Closure";
import {IExpression} from "../expression/IExpression";
import {ImmediateValue} from "../expression/ImmediateValue";
import {IOperator, Operator} from "../operator/IOperator";

export class ForeachOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var efunc: Object = engine.eval(<IExpression>args[0]);
    var eargs1: any   = engine.eval(args[1]);

    if (eargs1 instanceof Array) {
      var array: Array<any> = eargs1;
      var ret:   Array<any> = [];

      if (efunc instanceof Closure) {
        array.forEach((elem) => ret.push((<Closure>efunc).eval([elem])));
      } else {
        array.forEach((elem) => ret.push((<IOperator>efunc).call(engine, [elem])));
      }

      return ret;
    } else {
        if (!(eargs1 instanceof ImmediateValue) && !(eargs1.value instanceof Array)) {
          throw new Error("for-each requires array and function as a Operator");
        }

        var array: Array<any> = eargs1.value;
        var ret:   Array<any>  = [];

        if (efunc instanceof Closure) {
          array.forEach((elem) => ret.push((<Closure>efunc).eval([elem])));
        } else {
          array.forEach((elem) => ret.push((<IOperator>efunc).call(engine, [elem])));
        }

        return ret;
      }
  }
}
