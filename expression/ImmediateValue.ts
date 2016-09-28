import { Engine } from '../Engine';
import { IExpression } from "./IExpression";
export /**
 * ImmediateValue 
 */
class ImmediateValue implements IExpression {
  private value: Object;

  constructor(value: Object) {
    this.value = value;
  }

  /**
   * eval
   */
  public eval(engine: Engine): Object {
    return this.value;
  }
}