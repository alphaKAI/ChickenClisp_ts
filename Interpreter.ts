/// <reference path="./typings/index.d.ts" />
// app
import {Engine} from "./Engine";
import {Transpiler} from "./Transpiler";

export class Interpreter {
  private engine: Engine;
  private transpiler: Transpiler;
  private bracketState: number;

  constructor() {
    this.engine     = new Engine();
    this.transpiler = new Transpiler();
    this.bracketState = 0;
  }

  checkBracket(code: string): boolean {
    for (var i: number = 0; i < code.length; ++i) {
      var ch: string = code[i];

      if (ch == "(") { this.bracketState++; }
      if (ch == ")") { this.bracketState--; }
    }

    if (this.bracketState == 0) {
      return true;
    } else {
      return false;
    }
  }

  interpreter() {
    var buf: Array<string> = new Array<string>();
    process.stdout.write("=> ");
    process.stdin.setEncoding('utf8');
    var that = this;
    process.stdin.on('data', function(val){
      function e(): void {
        if (that.checkBracket(buf.join()) && (buf.length != 0)) {
          console.log(that.engine.eval(that.transpiler.transpile(buf.join())));
          buf = new Array<string>();
        }
      }

      if ('\n' == val || '\r\n' == val) {
        e();
      } else {
        buf.push(val.trimRight());
        e();
      }

      for (var i: number = 0; i < that.bracketState + 1; ++i) {
        process.stdout.write("=");
      }
      process.stdout.write("> ");
    });
  }
}
