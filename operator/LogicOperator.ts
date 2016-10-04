import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class NotOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return !<boolean>engine.eval(args[0]);
  }
}

export class AndOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return <boolean>engine.eval(args[0]) && <boolean>engine.eval(args[1]);
  }
}

export class OrOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return <boolean>engine.eval(args[0]) || <boolean>engine.eval(args[1]);
  }
}
