/// <reference path="./typings/index.d.ts"/>
import {Engine} from "./Engine";
import {Transpiler} from "./Transpiler";
import {Interpreter} from "./Interpreter";

var flag: boolean = false;
var fs = require("fs");
var path = require("path");

if (process.argv.length == 3 && path.basename(process.argv[0]) == "node") {
  var fpath: string = process.argv[2];

  if (!fs.existsSync(fpath)) {
    console.log("No such file - " + fpath);
  } else {
    var engine: Engine = new Engine();
    var transpiler: Transpiler = new Transpiler();

    engine.eval(transpiler.transpile(<string>fs.readFileSync(fpath).toString()));
  }
} else if (process.argv.length == 2) {
  var itpr = new Interpreter();
  itpr.interpreter();
} else {
  console.log("error"); // this error comment needs improving
}
