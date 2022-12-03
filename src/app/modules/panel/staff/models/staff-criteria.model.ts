import { compose, maxLength, prop } from "@rxweb/reactive-form-validators";
import { NationalCodeValidator } from "../../../../@core/form.custom.validators";

export class StaffCriteria {
  @prop()
  name?: string;

  @prop()
  family?: string;

  @prop()
  @maxLength({ value: 10 })
  @compose({ validators: [NationalCodeValidator()] })
  nationalCode?: string;

  @prop()
  gender?: boolean;

  @prop()
  personneliCode?: string;

  @prop()
  positionId?: number;

  @prop()
  departmentId?: number;

  @prop()
  cooperationId?: number;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}
