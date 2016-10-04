import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

/**
 * Dynamic Operator
 */

export class DynamicOperator extends Operator implements IOperator {
  private funcArgs: string[];
  private funcBody: Object;

  constructor(funcArgs: string[], funcBody: Object) {
    super();
    this.funcArgs = funcArgs;
    this.funcBody = funcBody;
  }

  public call(engine: Engine, args: Array<any>): Object {
    var i: number = 0;
    var _engine: Engine = engine.clone();

    this.funcArgs.forEach(arg => {
      _engine.defineVariable(arg, engine.eval(args[i++]));
    });

    return _engine.eval(this.funcBody);
  }
}
