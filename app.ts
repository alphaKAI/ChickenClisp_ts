// app
import {Engine} from "./Engine";
import {Transpiler} from "./Transpiler";

var engine: Engine         = new Engine();
var transpiler: Transpiler = new Transpiler();
/**
 * sum of 1 to 10
 */
 /*
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
*/
/**
 * S Expression
 */
// loop 10 times and square 10
var code1: string = `
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
  (set sum 0)
  (set i 1)
  (while (<= (get i) 10)
    (step
      (set sum (+ (get sum) (get i)))
      (set i (+ (get i) 1))))
  (print (get sum)))
`;

var code3: string = `
(step
  (def fun (x) (* (get x) 40))
  (set f (get-fun fun))
  (print ((get f) (fun 10))))
`;

var code4: string = `
(step
  (set x (lambda (y) (* (get y) (get y))))
  (print ((get x) 500))
  (print ((lambda (z) (* (get z) 40)) 10)))
`;

var code5: string = `
(step
  (print '(1 2 3 4 5 6 789))
  (print (map (lambda (x) (* (get x) (get x))) '(1 2 3 4 5))))
`;

var code6: string = `
(step
  (set arr (set-idx '(1 2 3 4 5) 2 100))
  (print (map (lambda (x) (* (get x) 10)) (get arr))))
`;

var code7: string = `
(step
  (set x 10)
  (print (get x)))
`;

var factor: string = `
(step
  (def factor (x)
    (if (<= (get x) 1)
      1
      (* (get x) (factor (- (get x) 1)))))
  (print (factor 4))
  (print (factor 5)))
`
var fib = `
(step
  (def fib (n) (step
    (if (= (get n) 0) 0
      (if (= (get n) 1) 1
        (+ (fib (- (get n) 1)) (fib (- (get n) 2)))))))
  (def-var i 0)
  (while (< (get i) 10) (step
    (print (fib (get i)))
    (set i (+ (get i) 1)))))
`;

var codes = [
  code1,
  code2,
  code3,
  code4,
  code5,
  code6,
  code7,
  factor,
  fib
];


var idx: number = 1;

codes.forEach(code => {
  console.log("Sample code", idx++, " :");
  console.log("CODE----------------------------------------");
  console.log(code);
  console.log("OUTPUTS--------------------------------------");

  engine.eval(transpiler.transpile(code));
  console.log("\n");
});

import {Interpreter} from "./Interpreter";

var itpr = new Interpreter();
itpr.interpreter();
