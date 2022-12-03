import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentMeetingAttendeesVM {
  id: number | null;
  @prop()
  @required()
  departmentMeetingId: number | null;

  @prop()
  @required()
  memberIds: any | null;
}
