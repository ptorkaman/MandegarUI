import { prop, required } from "@rxweb/reactive-form-validators";

export class StudyGradeModel {
  @prop()
  @required()
  name: string;
  @prop()
  @required()
  studyFieldId:any;
  id: any;
  @prop()
  @required()
  educationBasicCode:number;
}
