/**
 * Premitive Interfaces and Value Classes
 */
import {IExpression} from "./expression/IExpression";
import {IOperator, Operator} from "./operator/IOperator";
import {CallOperator} from "./expression/CallOperator";
import {ImmediateValue} from "./expression/ImmediateValue";
import {Closure} from "./Closure";

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
import {PrintOperator, PrintlnOperator} from "./operator/PrintOperator";
import {DeffunOperator} from "./operator/DeffunOperator";
import {WhileOperator} from "./operator/WhileOperator";
import {GetfunOperator} from "./operator/GetfunOperator";
import {DynamicOperator} from "./operator/DynamicOperator";
import {LambdaOperator} from "./operator/LambdaOperator";
import {MapOperator} from "./operator/MapOperator";
import {SetIdxOperator} from "./operator/SetIdxOperator";
import {AsIVOperator} from "./operator/AsIVOperator";
import {DefvarOperator} from "./operator/DefvarOperator";
import {SeqOperator} from "./operator/SeqOperator";
import {FoldOperator} from "./operator/FoldOperator";
import {LengthOperator} from "./operator/LengthOperator";
import {CarOperator} from "./operator/CarOperator";
import {CdrOperator} from "./operator/CdrOperator";
import {LoadOperator} from "./operator/LoadOperator";
import {CondOperator} from "./operator/CondOperator";
import {AliasOperator} from "./operator/AliasOperator";
import {TimeOperator} from "./operator/TimeOperator";
import {LetOperator} from "./operator/LetOperator";
import {ForeachOperator} from "./operator/ForeachOperator";
import {RemoveOperator} from "./operator/RemoveOperator";
import {ConsOperator} from "./operator/ConsOperator";
/**
 * Script Engine of Orelang_TS
 */
export class Engine {
  /**
   * This holds variables and operators.
   * You can distinguish A VALUE of the child of this from whether a varibale or an operator.
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
    this.variables["not"] = this.variables["!"];
    this.variables["&&"]  = new AndOperator();
    this.variables["and"] = this.variables["&&"];
    this.variables["||"]  = new OrOperator();
    this.variables["or"]  = this.variables["||"];
    this.variables["print"] = new PrintOperator();
    this.variables["println"] = new PrintlnOperator();
    this.variables["def"]   = new DeffunOperator();
    this.variables["while"] = new WhileOperator();
    this.variables["get-fun"] = new GetfunOperator();
    this.variables["lambda"]  = new LambdaOperator();
    this.variables["map"]     = new MapOperator();
    this.variables["set-idx"] = new SetIdxOperator();
    this.variables["as-iv"]   = new AsIVOperator();
    this.variables["def-var"] = new DefvarOperator();
    this.variables["seq"]     = new SeqOperator();
    this.variables["fold"]    = new FoldOperator();
    this.variables["length"]  = new LengthOperator();
    this.variables["car"]     = new CarOperator();
    this.variables["cdr"]     = new CdrOperator();
    this.variables["load"]    = new LoadOperator();
    this.variables["cond"]    = new CondOperator();
    this.variables["alias"]   = new AliasOperator();
    this.variables["time"]    = new TimeOperator();
    this.variables["let"]     = new LetOperator();
    this.variables["for-each"] = new ForeachOperator();
    this.variables["remove"]   = new RemoveOperator();
    this.variables["cons"]   = new ConsOperator();
  }

  /*
    Clone this object
  */
  private _super: Engine = null;
  public clone(): Engine {
    var newEngine: Engine = new Engine();

    newEngine._super    = this;

    for (var key in this.variables) { newEngine.variables[key] = this.variables[key]; }

    return newEngine;
  }

  public defineVariable(name: string, value: Object): Object {
    this.variables[name] = value;

    return value;
  }

  public setVariable(name: string, value: Object): Object {
    var engine: Engine = this;

    while (true) {
      if (engine.variables[name] != undefined) {
        engine.variables[name] = value;

        return value;
      } else if (engine._super != null) {
        engine = engine._super;
      } else {
        engine.defineVariable(name, value);
      }
    }
  }

  public getVariable(name: string) {
    var engine: Engine = this;

    while (true) {
      if (engine.variables[name] != undefined) {
        return engine.variables[name];
      } else if (engine._super != null) {
        engine = engine._super;
      } else {
        return undefined;
      }
    }
  }

  /**
   * Evalute Object
   */
  public eval(script: Object): Object {
    var ret: Object = this.getExpression(script);

    if (ret instanceof Operator) {
      return ret;
    }

    ret = (<IExpression>ret).eval(this);

    if (ret instanceof Operator) {
      return new Closure(this, <IOperator>ret);
    } else {
      return ret;
    }
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
        var tmp = ret.eval(this);

        if (tmp instanceof Closure) {
          return new ImmediateValue((<Closure>tmp).eval(scriptList.slice(1)));
        } else if (tmp instanceof Operator) {
          return new ImmediateValue((<IOperator>tmp).call(this, scriptList.slice(1)));
        }
      }
      return new CallOperator(<IOperator>this.variables[scriptList[0]], scriptList.slice(1));
    } else {
      var tmp = this.getVariable(<string>script);
      if (tmp != undefined) {
        if (tmp instanceof Operator) {
          return <IExpression>tmp;
        } else {
          return new ImmediateValue(tmp);
        }
      }

      return new ImmediateValue(script);
    }
  }
}
