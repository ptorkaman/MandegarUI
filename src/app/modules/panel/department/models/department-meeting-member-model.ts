import { DepartmentStaffModel } from "./department-staff-model";
import { prop, required } from "@rxweb/reactive-form-validators";
export class DepartmentMeetingMemberModel {
  @prop()
  id?: number;
  @prop()
  meetingName?: string;
  @prop()
  departmentName?: string;
  @prop()
  members?: Array<DepartmentStaffModel>;
  @prop()
  @required()
  departmentId?:number;
  @prop()
  @required()
  departmentMeetingId?:number;
  @prop()
  @required()
  memberIds?:any;
}
