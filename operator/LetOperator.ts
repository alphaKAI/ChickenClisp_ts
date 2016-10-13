import {Engine} from "../Engine";
import {IOperator, Operator} from "../operator/IOperator";
import {ImmediateValue} from "../expression/ImmediateValue";
import {DynamicOperator} from "../operator/DynamicOperator";


export class LetOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    if (!(args[0] instanceof Array)) {
      var name: string = <string>args[0];
      var binds: Object = args[1];
      var body: Object  = args[2];
      var _engine = engine.clone();

      var names: Array<string> = [];
      var vars: Array<any>     = [];

      (<Array<any>>binds).forEach(bind => {
        var name: string = bind[0];
        var val: Object  = bind[1];
        names.push(name);
        vars.push(val);
      });

      _engine.defineVariable(name, new DynamicOperator(names, body));
      var ret: Object = (<IOperator>_engine.getVariable(name)).call(_engine, vars);

      if (ret == undefined) {
        return 0;
      } else {
        return ret;
      }
    } else {
      var binds: Object = args[0];
      var body: Object = args[1];
      var _engine = engine.clone();

      (<Array<any>>binds).forEach(bind => {
        var name: string = bind[0];
        var val: Object  = engine.eval(bind[1]);

        _engine.defineVariable(name, val);
      });

      return _engine.eval(body);
    }
  }
}
