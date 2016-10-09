/// <reference path="../typings/index.d.ts"/>
import {Engine} from "../Engine";
import {Transpiler} from "../Transpiler";
import {IOperator, Operator} from "../operator/IOperator";

var fs = require("fs");
var path = require("path");
var transpiler: Transpiler = new Transpiler();

export class LoadOperator extends Operator implements IOperator {
  /**
   * call
   */
  public call(engine: Engine, args: Array<any>): Object {
    var loaded: Array<any> = [];
    var eargs0: Object = engine.eval(args[0]);

    if (eargs0 instanceof Array) {
      args = eargs0;
    }

    console.log(args);

    var fpaths: Array<any> = args.map(arg => (<string>engine.eval(arg)) + ".ore");

    fpaths.forEach(fpath => {
      if (!fs.existsSync(fpath)) {
        throw new Error("No such file - " + fpath);
      } else {
        engine.eval(transpiler.transpile(<string>fs.readFileSync(fpath).toString()));
        loaded.push(fpath);
      }
    });

    return loaded;
  }
}
