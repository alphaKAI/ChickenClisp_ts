/**
 * Premitive Interfaces and Value Classes
 */
import {IExpression} from "./expression/IExpression";
import {IOperator} from "./operator/IOperator";
import {CallOperator} from "./expression/CallOperator";
import {ImmediateValue} from "./expression/ImmediateValue";

/**
 * Operators
 */
import {AddOperator} from "./operator/AddOperator";
import {SubOperator} from "./operator/SubOperator";
import {MulOperator} from "./operator/MulOperator";
import {DivOperator} from "./operator/DivOperator";
import {ModOperator} from "./operator/ModOperator";
import {EqualOperator, LessOperator, GreatOperator, LEqOperator, GEqOperator} from "./operator/EqualOperator";
import {GetOperator} from "./operator/GetOperator";
import {SetOperator} from "./operator/SetOperator";
import {StepOperator} from "./operator/StepOperator";
import {UntilOperator} from "./operator/UntilOperator";
import {IfOperator} from "./operator/IfOperator";
import {NotOperator, AndOperator, OrOperator} from "./operator/LogicOperator";
import {PrintOperator} from "./operator/PrintOperator";
import {DeffunOperator} from "./operator/DeffunOperator";
import {WhileOperator} from "./operator/WhileOperator";

/**
 * Script Engine of Orelang_TS
 */
export class Engine {
  /**
   * This holds Operators as a hash table by string key.
   */
  public operators: {[key: string]: IOperator} = {};
  /**
   * This holds global variables.
   * Current Orelang_TS provides global varibale only.
   */
  public variables: {[key: string]: Object} = {};

  constructor() {
    this.operators["+"] = new AddOperator();
    this.operators["-"] = new SubOperator();
    this.operators["*"] = new MulOperator();
    this.operators["/"] = new DivOperator();
    this.operators["%"] = new ModOperator();
    this.operators["="] = new EqualOperator();
    this.operators["<"] = new LessOperator();
    this.operators[">"] = new GreatOperator();
    this.operators["<="] = new LEqOperator();
    this.operators[">="] = new GEqOperator();
    this.operators["set"] = new SetOperator();
    this.operators["get"] = new GetOperator();
    this.operators["until"] = new UntilOperator();
    this.operators["step"] = new StepOperator();
    this.operators["if"] = new IfOperator();
    this.operators["!"] = new NotOperator();
    this.operators["&&"] = new AndOperator();
    this.operators["||"] = new OrOperator();
    this.operators["print"] = new PrintOperator();
    this.operators["def"] = new DeffunOperator();
    this.operators["while"] = new WhileOperator();
  }

  /**
   * Evalute Object
   */
  public eval(script: Object): Object {
    return this.getExpression(script).eval(this);
  }

  /**
   * getExpression
   * Build Script Tree
   */
  public getExpression(script: Object): IExpression {
    if (script instanceof Array) {
      var scriptList:Array<any> = script;
      return new CallOperator(this.operators[scriptList[0]], scriptList.slice(1));
    } else {
      return new ImmediateValue(script);
    }
  }
}
