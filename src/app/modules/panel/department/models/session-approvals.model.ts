import { prop, required } from "@rxweb/reactive-form-validators";


export class SessionApprovalModel {
  id?: number;
  @prop()
  @required()
  departmentMeetingId?: number;
  @prop()
  @required()
  test?: string;
  @prop()
  @required()
  deadline?: string;
  @prop()
  @required()
  memberIds?: any;
}
