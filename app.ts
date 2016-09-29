// app
import {Engine} from "./Engine";
import {Transpiler} from "./Transpiler";

var engine: Engine = new Engine();
var transpiler: Transpiler = new Transpiler();
/**
 * sum of 1 to 10
 */
var x = engine.eval(
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

/**
 * S Expression
 */
var code: string = `
(step
  (def square (x)
    (* (get x) (get x))
  )
  (set x 0)
  (while (< (get x) 10)
    (step
      (print (get x))
      (set x (+ (get x) 1))
    )
  )
  (print (square 10))
)
`;
engine.eval(transpiler.transpile(code));
// Lisp(S expression) to JSON Array (Internal Expression of Orelang_TS) 