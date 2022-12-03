import { prop } from "@rxweb/reactive-form-validators";

export class SessionApprovalsCriteriaModel {

  @prop()
  departmentMeetingId?: number;
  @prop()
  test?: string;
  @prop()
  deadlineFrom?: Date;
  @prop()
  deadlineTo?: Date;
  @prop()
  memberIds?: any;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}
