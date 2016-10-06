import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";
import {ImmediateValue} from "../expression/ImmediateValue";
import {IExpression} from "../expression/IExpression";
import {Closure} from "../Closure";

export class FoldOperator extends Operator implements IOperator {
  public call(engine: Engine, args: Array<any>): Object {
    var func: IExpression = args[0];
    var tmp: Object       = args[1];
    var eargs: any        = engine.eval(args[2]);

  if (eargs instanceof Array) {
    var array: Array<any> = eargs;
    var efunc: Object = engine.eval(func);

    if (efunc instanceof Closure) {
      array.forEach((elem) =>
        tmp = (<Closure>efunc).eval([tmp, elem])
      );
    } else if (efunc instanceof Operator) {
      array.forEach((elem) =>
        tmp = (<IOperator>efunc).call(engine, [tmp, elem])
      );
    }

    return tmp;
  } else {
      if (!(eargs instanceof ImmediateValue) && !(eargs.value instanceof Array)) {
        throw new Error("Map requires array and function as a Operator");
      }

      var array: Array<any> = eargs.value;
      var efunc: Object = engine.eval(func);

      if (efunc instanceof Closure) {
        array.forEach((elem) =>
          tmp  = (<Closure>efunc).eval([tmp, elem]));
      } else {
        array.forEach((elem) => tmp = (<IOperator>efunc).call(engine, [tmp, elem]));
      }

      return tmp;
    }
  }
}
