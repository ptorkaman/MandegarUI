import { EvaluationGroupModel } from './../../../models/evaluation-group.model';
import { EvaluationGroupService } from './../../../services/evaluation-group.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: 'app-evaluation-group-add',
  templateUrl: './evaluation-group-add.component.html',
  styleUrls: ['./evaluation-group-add.component.scss']
})
export class EvaluationGroupAddComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: EvaluationGroupModel;
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private dataService: DataService,
    private evaluationGroupService: EvaluationGroupService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.formModel = new EvaluationGroupModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.evaluationGroupService.create(this.formModel).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);
        this.dataService.sendData(true);
        this.cancelClick();
      }
      else {
        this.showErrorMessage(result.message);
        this.setLoading(false);
      }
    })
  }

  cancelClick() {
    this.display = false;
    setTimeout(() => {
      this.navigateBack();
    }, 100);
  }

}
