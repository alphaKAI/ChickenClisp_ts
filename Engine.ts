/**
 * Premitive Interfaces and Value Classes
 */
import {IExpression} from "./expression/IExpression";
import {IOperator} from "./operator/IOperator";
import {CallOperator} from "./expression/CallOperator";
import {ImmediateValue} from "./expression/ImmediateValue";

/**
 * variables
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
import {GetfunOperator} from "./operator/GetfunOperator";
import {DynamicOperator} from "./operator/DynamicOperator";
import {LambdaOperator} from "./operator/LambdaOperator";
import {MapOperator} from "./operator/MapOperator";
import {SetIdxOperator} from "./operator/SetIdxOperator";
import {AsIVOperator} from "./operator/AsIVOperator";
/**
 * Script Engine of Orelang_TS
 */
export class Engine {
  /**
   * This holds variables as a hash table by string key.
   */
  //public variables: {[key: string]: IOperator} = {};
  /**
   * This holds global variables.
   * Current Orelang_TS provides global varibale only.
   */
  public variables: {[key: string]: Object} = {};

  constructor() {
    this.variables["+"] = new AddOperator();
    this.variables["-"] = new SubOperator();
    this.variables["*"] = new MulOperator();
    this.variables["/"] = new DivOperator();
    this.variables["%"] = new ModOperator();
    this.variables["="] = new EqualOperator();
    this.variables["<"] = new LessOperator();
    this.variables[">"] = new GreatOperator();
    this.variables["<="]  = new LEqOperator();
    this.variables[">="]  = new GEqOperator();
    this.variables["set"] = new SetOperator();
    this.variables["get"] = new GetOperator();
    this.variables["until"] = new UntilOperator();
    this.variables["step"]  = new StepOperator();
    this.variables["if"] = new IfOperator();
    this.variables["!"]  = new NotOperator();
    this.variables["&&"] = new AndOperator();
    this.variables["||"] = new OrOperator();
    this.variables["print"] = new PrintOperator();
    this.variables["def"]   = new DeffunOperator();
    this.variables["while"] = new WhileOperator();
    this.variables["get-fun"] = new GetfunOperator();
    this.variables["lambda"]  = new LambdaOperator();
    this.variables["map"]     = new MapOperator();
    this.variables["set-idx"] = new SetIdxOperator();
    this.variables["as-iv"]   = new AsIVOperator();
  }

  private _super: Engine = null;
  public clone(engine: Engine) {
    this._super = engine;
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
    if (script instanceof ImmediateValue) {
      return script;
    }
    if (script instanceof Array) {
      var scriptList:Array<any> = script;
      if (scriptList[0] instanceof Array) {
        var ret = new CallOperator(<IOperator>this.variables[scriptList[0][0]], scriptList[0].slice(1));
        return new ImmediateValue((<IOperator>ret.eval(this)).call(this, scriptList.slice(1)));
      }
      return new CallOperator(<IOperator>this.variables[scriptList[0]], scriptList.slice(1));
    } else {
      return new ImmediateValue(script);
    }
  }
}
