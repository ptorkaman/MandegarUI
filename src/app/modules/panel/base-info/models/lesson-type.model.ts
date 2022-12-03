import { prop, required } from "@rxweb/reactive-form-validators";

export class LessonTypeModel {
  @prop()
  @required()
  name: string;


  id: any;

}
