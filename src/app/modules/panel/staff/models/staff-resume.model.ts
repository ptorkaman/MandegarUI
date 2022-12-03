import { prop, required } from "@rxweb/reactive-form-validators";

export class StaffResumeModel {
  @prop()
  id?: number;

  @prop()
  @required()
  staffId: number;

  @prop()
  @required()
  workExperienceTypeId?: number;

  @prop()
  academicYearId?: number;

  @prop()
  cooperationTypeId?: number;

  @prop()
  activityFieldId?: number;

  @prop()
  @required()
  positionId?: number;

  @prop()
  @required()
  workPlaceName?: string;

  @prop()
  activityDuration?: number;

  @prop()
  // @required()
  startDate: string;

  @prop()
  // @required()
  endDate: string;

  workExperienceTypeName: string;
  academicYearName: string;
  cooperationTypeName: string;
  activityFieldName: string;
  positionName: string;
}
