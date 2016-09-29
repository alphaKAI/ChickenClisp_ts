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

export class Engine {
  public operators: {[key: string]: IOperator} = {};
  public variables: {[key: string]: Object} = {};

  constructor() {
    this.operators["+"] = new AddOperator();
    this.operators["*"] = new MulOperator();
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
   * eval
   */
  public eval(script: Object): Object {
    return this.getExpression(script).eval(this);
  }

  /**
   * getExpression
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
