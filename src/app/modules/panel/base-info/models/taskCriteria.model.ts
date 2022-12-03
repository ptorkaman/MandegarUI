import { email, prop, required } from "@rxweb/reactive-form-validators";

export class TaskCriteriaModel {
  @prop()
  @required()
  name: string;
  taskGroupId:number;

  id: any;
  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}
