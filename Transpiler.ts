// Transpile Lisp(S-Expression) into internal expression of Orelang_Ts(JSON Array)

import {Parser} from "./Parser";

export class Transpiler {
  constructor() {}

  /**
   * Current implementation uses many regex conversion as you see, this looks aweful.
   * I'll impliment more useful and efficient transpiler to replace with this.
   */
  transpile(code: string): JSON {
    return Parser.parse(code.replace(/;.*$/g, "").replace(/\n/g, ""))[0];
  }
}
