import { prop, required } from "@rxweb/reactive-form-validators";

export class LessonModel {
  @prop()
  @required()
  name: string;
  @prop()
  @required()
  studyGradeId:any;
  id: any;
  @prop()
  @required()
  educationCourseCode:number;
  @prop()
  @required()
  lessonTypeId:number;
  @prop()
  lessonTypeName:string;
  @prop()
  studyGradeName:string;
  @prop()
  @required()
  courseUnits:number;
}
