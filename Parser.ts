// Parser
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
          i = i + j;
        } else if (ch == ")") {
          return out;
        } else {
          if (!isNaN(Number(ch))) {
            var tmp: string = "";
            var j = i;

            do {
              tmp += code[j];
              j++;
            } while (!isNaN(Number(code[j])))

            i = j-1;

            out.push(Number(tmp));
            continue;
          } else if (ch == "\"" || ch == "\'") {
            var target = ch;
            var tmp: string = "";
            var j = i+1;

            while (code[j] != ch && code[j] ) {
              if (j < code.length) {
                tmp += code[j];
              } else {
                throw new Error("Syntax Error");
              }
              j++;
            }

            i = j;
            out.push(tmp);
            continue;
          } else {
            var tmp: string = "";
            var j = i;

            while (code[j] && code[j] != "\"" && code[j] != "\'" && code[j] != "(" && code[j] != ")" && code[j] != " ") {
              tmp += code[j];
              j++;
            }
            i = j;
            out.push(tmp);
          }
        }
      }
    }

    return out;
  }
  //console.log("parsed -> ", parse(`(foo 12345 "abcdef" (abc hij))`));
}
