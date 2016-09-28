import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class NotOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return !<boolean>engine.eval(args[0]);
  }
}

export class AndOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return <boolean>engine.eval(args[0]) && <boolean>engine.eval(args[1]);
  }
}

export class OrOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return <boolean>engine.eval(args[0]) || <boolean>engine.eval(args[1]);
  }
}