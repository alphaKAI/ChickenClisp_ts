import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

/**
 * Dynamic Operator
 */

export class DynamicOperator implements IOperator {
  private funcArgs: string[];
  private funcBody: Object;

  constructor(funcArgs: string[], funcBody: Object) {
    this.funcArgs = funcArgs;
    this.funcBody = funcBody;
  }

  public call(engine: Engine, args: Array<any>): Object {
    var i: number = 0;
    var targ: any = ["step"];

    /*
      TODO: This arguments passing style has a problem, which can confilict with already used name and argument name.
    */
    this.funcArgs.forEach(key => {
      targ.push(["set", key, args[i]]);
    });

    // 1 offset for step operator
    if (targ.length > 1) {
      engine.eval(targ);
    }

    return engine.eval(this.funcBody);
  }
}
