import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";
import {ImmediateValue} from "../expression/ImmediateValue";
import {IExpression} from "../expression/IExpression";

export class MapOperator implements IOperator {
  public call(engine: Engine, args: Array<any>): Object {
    var func:IExpression = args[0];

    if (!(args[1] instanceof ImmediateValue) && !(args[1].value instanceof Array)) {
      throw new Error("Map requires array and function as a Operator");
    }

    var array: Array<any> = args[1].value;
    var ret: Array<any> = [];
    var efunc:IOperator = <IOperator>engine.eval(func);

    array.forEach((elem) => ret.push(efunc.call(engine, [elem])));

    return ret;
  }
}
