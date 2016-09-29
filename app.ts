/// <reference path="./Engine.d.ts" />

// app
import {Engine} from "./Engine";

var engine: Engine = new Engine();
/*var x = engine.eval(
  ["step",
    ["set", "i", 10],
    ["set", "sum", 0],
    ["until", ["=", ["get", "i"], 0], [
      "step",
      ["set", "sum", ["+", ["get", "sum"], ["get", "i"]]],
      ["set", "i", ["+", ["get", "i"], -1]]
    ]],
    ["get", "sum"]
  ]
);
*/
var x = engine.eval(
  ["step",
    ["def", "square", ["x"], ["*", ["get", "x"], ["get", "x"]]],
    ["print", ["square", 10]]
  ]
);
