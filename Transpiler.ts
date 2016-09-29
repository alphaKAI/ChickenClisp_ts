// Transpile Lisp(S-Expression) into internal expression of Orelang_Ts(JSON Array) 

export class Transpiler {
  constructor() {}

  /**
   * Current implementation uses many regex conversion as you see, this looks aweful.
   * I'll impliment more useful and efficient transpiler to replace with this. 
   */
  transpile(code: string): JSON {
    code = code
            .replace(/\(/g, "[")// ( -> [
            .replace(/\)/g, "]")// ( -> ]
            .replace(/;.*/g, "")// remove comments
            .replace(/\n/g, "")// remove line return
            .replace(/\=/g, "\"=\"")// escape =
            .replace(/(\<)/g, "\"$1\"")// escape <
            .replace(/(\>)/g, "\"$1\"")// escape >
            .replace(/(\"\<\"\"\=\")/g, "\"<=\"")// fix "<""="" -> "<="
            .replace(/(\"\>\"\"\=\")/g, "\">=\"")//fix ">""=" -> ">="
            .replace(/\+/g, "\"+\"")// escape +
            .replace(/\-/g, "\"-\"")// escape -
            .replace(/\*/g, "\"*\"")// escape *
            .replace(/\//g, "\"/\"")// escape /
            .replace(/\!/g, "\"!\"")// escape !
            .replace(/\|\|/g, "\"||\"")// escape ||
            .replace(/&&/g, "\"&&\"")// escape &&
            .replace(/\s\s+/g, " ")// folds spaces into one space
            .split(" ").join(", ")// join by space with ,
            .replace(/,\s*\]/g, "]")// remove comma of last elements [a, b, c,] -> [a, b, c
            .replace(/\[(?!\")(([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9]|_)*)/g, "[\"$1\"")// escape symbols
            .replace(/\s(([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9]|_)*)\s/g, "\"$1\"")// escape symbols
            .replace(/,\s(([a-z]|[A-Z]|_)([a-z]|[A-Z]|[0-9]|_)*)/g, ", \"$1\"");// escape symbols
      return JSON.parse(code);
    }
}