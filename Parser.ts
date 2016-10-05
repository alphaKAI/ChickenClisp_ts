// Parser

import {ImmediateValue} from "./expression/ImmediateValue";

export class Parser {
  static nextBracket(code: string): number {
    var i: number = 0
    var leftCount: number = 1;
    var rightCount: number = 0;

    while (leftCount != rightCount) {
      if (code[i] == "(") { leftCount++ }
      if (code[i] == ")") { rightCount++ }
      ++i;
    }

    return i;
  }

  static parse(code: string): Array<any> {
    var out: Array<any> = [];
    var symbol: string;

    for (var i:number = 0; i < code.length; i++) {
      var ch = code[i];

      if (ch == ' ') {
        continue;
      } else {
        if (ch == "(") {
          var j = Parser.nextBracket(code.slice(i+1));

          out.push(Parser.parse(code.slice(i+1, i + j)));

          i += j;
        } else if (ch == ")") {
          return out;
        } else {
          if (!isNaN(Number(ch))) {
            var tmp: string = "";
            var j = i;

            do {
              tmp += code[j];
              ++j;
            } while ((code[j] != " " && !isNaN(Number(code[j]))) || (code[j] == "." && code[j + 1] != undefined && !isNaN(Number(code[j + 1]))));

            out.push(Number(tmp));

            i = j-1;
          } else if (ch == "\"" || ch == "\'") {
            if (ch == '\'' && code[i + 1] && code[i + 1] == "(") {
              var tmp:string = "";
              var j = i+1;

              while (code[j] != ")" && code[j]) {
                if (j < code.length) {
                  tmp += code[j];
                } else {
                  throw new Error("Syntax Error");
                }
                ++j;
              }

              out.push(new ImmediateValue(Parser.parse(tmp + ")")[0]));

              i = j;
            } else {
              var tmp: string = "";
              var j = i+1;

              while (code[j] != ch && code[j] ) {
                if (j < code.length) {
                  tmp += code[j];
                } else {
                  throw new Error("Syntax Error");
                }
                ++j;
              }

              out.push(tmp);
              i = j;
            }
          } else {
            var tmp: string = "";
            var j = i;

            while (
              code[j] && code[j] != "\"" && code[j] != "\'" &&
              code[j] != "(" && code[j] != ")" && code[j] != " ") {
              tmp += code[j];
              ++j;
            }

            if (tmp == "true") {
              out.push(true);
            } else if (tmp == "false") {
              out.push(false);
            } else if (tmp == "null") {
              out.push(null);
            } else {
              out.push(tmp);
            }

            i = j;
          }
        }
      }
    }

    return out;
  }
}

//console.log("parsed -> ", Parser.parse(`(foo 12345 "abcdef" (abc hij) '(1 2 3 4 5 6 789))`));
