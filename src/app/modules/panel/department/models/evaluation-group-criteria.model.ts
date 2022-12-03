
import { prop } from "@rxweb/reactive-form-validators";

export class EvaluationGroupCriteriaModel {
  id?: number;
  @prop()
  name?: string;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}
