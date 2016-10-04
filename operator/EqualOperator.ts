import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";

export class EqualOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) === engine.eval(args[1]);
  }
}

export class NotEqualOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) != engine.eval(args[1]);
  }
}

export class LessOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) < engine.eval(args[1]);
  }
}

export class GreatOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) > engine.eval(args[1]);
  }
}

export class LEqOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) <= engine.eval(args[1]);
  }
}

export class GEqOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    return engine.eval(args[0]) >= engine.eval(args[1]);
  }
}
