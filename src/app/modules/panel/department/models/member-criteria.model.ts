import { prop } from "@rxweb/reactive-form-validators";

export class MemberCriteriaModel {
  @prop()
  departmentId?: number;
  @prop()
  departmentMeetingId?: number;
  @prop()
  departmentMemberIds?: any;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}
