import { prop, required } from "@rxweb/reactive-form-validators";

export class StudyDegreeModel {
  @prop()
  @required()
  name: string;


  id: any;

}
