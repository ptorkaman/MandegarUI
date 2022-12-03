import { maxLength, maxNumber, minLength, minNumber, prop, required } from "@rxweb/reactive-form-validators";

export class StaffSacrificeModel {
  @prop()
  staffId: number;

  @prop()
  isMartyrFamily: boolean;

  @prop()
  @required({ conditionalExpression: function () { return this.isMartyrFamily == true } })
  relationId?: number;

  @prop()
  isFreedMan: boolean;

  @prop()
  @required({ conditionalExpression: function () { return this.isFreedMan == true } })
  @minNumber({ value: 1 })
  captivityDuration?: number;

  @prop()
  isVeteran?: boolean;

  @prop()
  @minNumber({ value: 1 })
  @maxNumber({ value: 99, })
  @required({ conditionalExpression: function () { return this.isVeteran == true } })
  veteranPercentage?: number;

  @prop()
  isSacrificer?: boolean;

  @prop()
  @required({ conditionalExpression: function () { return this.isSacrificer == true } })
  @minNumber({ value: 1 })
  battlefieldPresenceDuration?: number;
}
