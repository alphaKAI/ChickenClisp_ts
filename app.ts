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
// loop 10 times and square 10
var code: string = `
(step
  (def square (x)
    (step
      (set y (* (get x) (get x)))
      (set z (* (get x) (get x)))
      (* (get y) (get z))))
  (set x 1)
  (while (< (get x) 11)
    (step
      (print (get x))
      (set x (+ (get x) 1))))
  (print (square 10)))
`;

// sum 1 to 10
var code2: string = `
(step
  ; abc
  (set sum 0)
  (set i 1)
  (while (<= (get i) 10)
    (step
      (set sum (+ (get sum) (get i)))
      (set i (+ (get i) 1))))
  (print (get sum)))
`;

engine.eval(transpiler.transpile(code));
engine.eval(transpiler.transpile(code2));
// Lisp(S expression) to JSON Array (Internal Expression of Orelang_TS) 