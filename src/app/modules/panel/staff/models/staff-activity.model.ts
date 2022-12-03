import { prop, required } from "@rxweb/reactive-form-validators";

export class StaffActivityModel {
  @prop()
  id: number;

  @prop()
  @required()
  name: string;

  @prop()
  subject: string;

  @prop()
  publicationName: string;

  @prop()
  publicationDate: string;

  @prop()
  @required()
  staffId: number;

  @prop()
  @required()
  activityTypeId: number;

  @prop()
  @required()
  activityCaseId: number;

  activityTypeName: string;
  activityCaseName: string;
}
