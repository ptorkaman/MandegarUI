import { prop, required } from "@rxweb/reactive-form-validators";

export class StaffFinancialModel {
  @prop()
  id: number;

  @prop()
  @required()
  staffId: number;

  @prop()
  @required()
  bankId: number;

  @prop()
  @required()
  accountNumber: string;

  @prop()
  sheba: string;

  @prop()
  branchName: string;

  bankName: string;
}
