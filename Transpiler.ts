// Transpile Lisp(S-Expression) into internal expression of Orelang_Ts(JSON Array) 

export class Transpiler {
  constructor() {}

  /**
   * Current implementation uses many regex conversion as you see, this looks aweful.
   * I'll impliment more useful and efficient transpiler to replace with this. 
   */
  transpile(code: string): JSON {
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
            .replace(/,\s(([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9])*)/g, ", \"$1\"");
      return JSON.parse(code);
    }
}