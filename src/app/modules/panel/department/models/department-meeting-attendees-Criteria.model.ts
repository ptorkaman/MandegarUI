import { prop } from "@rxweb/reactive-form-validators";

export class DepartmentMeetingAttendeesSearchVM {

  @prop()
  id: number | null;

  @prop()
  departmentMeetingId: number | null;

  @prop()
  memberIds: any | null;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}
