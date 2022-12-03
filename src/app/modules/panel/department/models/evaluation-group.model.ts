import { prop, required } from "@rxweb/reactive-form-validators";

export class EvaluationGroupModel {
  id?: number;
  @prop()
  @required()
  name?: string;
}
