import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class EqualOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) === engine.eval(args[1]);
  }
}

export class NotEqualOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) != engine.eval(args[1]);
  }
}

export class LessOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) < engine.eval(args[1]);
  }
}

export class GreatOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) > engine.eval(args[1]);
  }
}

export class LEqOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) <= engine.eval(args[1]);
  }
}

export class GEqOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) >= engine.eval(args[1]);
  }
}