// app
import {Engine} from "./Engine";

var engine: Engine = new Engine();
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

// Lisp(S expression) to JSON Array (Internal Expression of Orelang_TS) 

code = code
        .replace(/\(/g, "[")
        .replace(/\)/g, "]")
        .replace(/\n/g, "")
        .replace(/(\<\=?)/g, "\"$1\"")
        .replace(/(\>\=?)/g, "\"$1\"")
        .replace(/(?!\<|\>)\=/g, "\"=\"")
        .replace(/\+/g, "\"+\"")
        .replace(/\-/g, "\"-\"")
        .replace(/\*/g, "\"*\"")
        .replace(/\//g, "\"/\"")
        .replace(/\!/g, "\"!\"")
        .replace(/\|\|/g, "\"||\"")
        .replace(/&&/g, "\"&&\"")
        .replace(/\s\s+/g, " ")
        .split(" ").join(", ")
        .replace(/,\s\]/g, "]")
        .replace(/\[(?!\")(([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9])*)/g, "[\"$1\"")
        .replace(/\s(([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9])*)\s/g, "\"$1\"")
        .replace(/,\s(([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9])*)/g, ", \"$1\"")

var x = engine.eval(JSON.parse(code))