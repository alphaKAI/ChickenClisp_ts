import {Engine} from "../Engine";
import {IOperator} from "../operator/IOperator";

export class DeffunOperator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var funcName: string = String(engine.eval(args[0]));
    var funcArgs: string[] = <string[]>args[1];
    var funcBody: Object = args[2];

    class X implements IOperator {
      private funcArgs: string[];
      private funcBody: Object;

      constructor(funcArgs: string[], funcBody: Object) {
        this.funcArgs = funcArgs;
        this.funcBody = funcBody;
      } 

      public call(engine: Engine, args: Array<any>): Object {
        var i: number = 0;
        var targ: any = ["step"];

        this.funcArgs.forEach(key => {
          targ.push(["set", key, args[i]]);
        });

        if (targ.length > 1) {
          engine.eval(targ);
        }
        
        return engine.eval(["step", this.funcBody]);
      }
    }

    var x: X = new X(funcArgs, funcBody);
    engine.operators[funcName] = x;
    return x;
  }
}