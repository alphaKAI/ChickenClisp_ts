import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";
import {ImmediateValue} from "../expression/ImmediateValue";
/*> (let ((i 1) (j 2))
    (+ i j))
3*/

export class LetOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var binds: Object = args[0];
    var body: Object = args[1];
    var _engine = engine.clone();

    if (!(binds instanceof Array)) {
      throw new Error("let requires a bind list");
    }

    (<Array<any>>binds).forEach(bind => {
      var name: string = bind[0];
      var val: Object  = bind[1];

      _engine.defineVariable(name, val);
    });

    return _engine.eval(body);
  }
}
