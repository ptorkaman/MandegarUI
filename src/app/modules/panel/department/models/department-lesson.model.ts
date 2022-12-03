import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentLessonModel {
  @prop()
  @required()
  departmentId: string;


  id: any;
  @prop()
  @required()
  lessonId:number
}
