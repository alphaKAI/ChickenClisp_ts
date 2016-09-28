import {Engine} from "../Engine";

export interface IExpression {
  eval(engine: Engine): Object;
}