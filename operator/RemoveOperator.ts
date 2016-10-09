import {Engine} from "../Engine";
import {Closure} from "../Closure";
import {IExpression} from "../expression/IExpression";
import {ImmediateValue} from "../expression/ImmediateValue";
import {IOperator, Operator} from "../operator/IOperator";

export class RemoveOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var func: IExpression  = args[0];
    var efunc: Object = engine.eval(func);
    var eargs1: Array<any> = <Array<any>>engine.eval(args[1]);
    var ret: Array<any>    = [];

    eargs1.forEach(elem => {
      var cnd: boolean;

      if (efunc instanceof Closure) {
        cnd = <boolean>(<Closure>efunc).eval([elem]);
      } else {
        cnd = <boolean>(<IOperator>efunc).call(engine, [elem]);
      }

      if (!cnd) {
        ret.push(elem);
      }
    });

    return ret;
  }
}
