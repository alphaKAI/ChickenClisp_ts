import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class SeqOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var n: number = <number>engine.eval(args[0]);
    var arr: Array<number> = new Array<number>(n);

    for (var i: number = 0; i < n; ++i) {
      arr[i] = i;
    }

    return arr;
  }
}
