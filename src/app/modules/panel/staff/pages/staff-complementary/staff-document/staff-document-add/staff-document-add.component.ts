import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DataService } from '../../../../../../../../app/@core/services';
import { BaseComponent } from '../../../../../../../shared/base/base.component';
import { StaffEducationDocumentModel } from '../../../../models';

@Component({
  selector: 'app-staff-document-add',
  templateUrl: './staff-document-add.component.html',
  styleUrls: ['./staff-document-add.component.scss']
})
export class StaffDocumentAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  staffId: number;
  staffDocument: StaffEducationDocumentModel;
  educations: any[] = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: RxFormBuilder) {
    super(route);
    this.staffId = this.getRouteValue(route, 'staffId');
  }


  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.staffDocument = new StaffEducationDocumentModel();
    this.staffDocument.staffId = this.staffId;
    this.form = this.formBuilder.formGroup(this.staffDocument);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    console.log(this.staffDocument)

    // this.setLoading(true);

    // this.staffCooperationService.update(this.staffCooperation).subscribe(result => {
    //   if (result.success) {
    //     this.showSuccessMessage(result.message);
    // this.dataService.sendData(true);
    //     this.setLoading(false);
    //     this.cancelClick();
    //   }
    //   else {
    //     this.showErrorMessage(result.message);
    //     this.setLoading(false);
    //   }
    // })

  }

  cancelClick() {
    this.navigateBack();
  }


}
