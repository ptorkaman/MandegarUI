import { prop, required } from "@rxweb/reactive-form-validators";

export class StudyFieldModel {
  @prop()
  @required()
  name: string;
  // @prop()
  // @required()
  // studyDefreeId:any;
  id: any;

}
