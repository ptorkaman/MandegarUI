import { prop, required } from "@rxweb/reactive-form-validators";

export class StaffEducationDocumentModel {
  @prop()
  id: number;

  @prop()
  staffId: number;

  @prop()
  @required()
  educationId: number;

  @prop()
  documentId: number;

  @prop()
  @required()
  courseName: string;

  @prop()
  startDate: string;

  @prop()
  period: number;

  @prop()
  @required()
  institutionName: string;

  @prop()
  degreeReceiptDate: string;

  @prop()
  @required()
  documents: any;
}
