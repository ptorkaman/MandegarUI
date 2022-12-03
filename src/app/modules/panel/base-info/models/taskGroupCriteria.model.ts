import { email, prop, required } from "@rxweb/reactive-form-validators";

export class TaskGroupCriteriaModel {
  @prop()
  @required()
  name: string;


  id: any;
  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}
