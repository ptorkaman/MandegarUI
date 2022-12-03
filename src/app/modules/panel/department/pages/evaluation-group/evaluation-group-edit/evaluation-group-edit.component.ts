import { EvaluationGroupModel } from './../../../models/evaluation-group.model';
import { EvaluationGroupService } from './../../../services/evaluation-group.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DataService } from './../../../../../../@core/services/data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-evaluation-group-edit',
  templateUrl: './evaluation-group-edit.component.html',
  styleUrls: ['./evaluation-group-edit.component.scss']
})
export class EvaluationGroupEditComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: EvaluationGroupModel;
  display: boolean = true;
  id: number;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private dataService: DataService,
    private evaluationGroupService: EvaluationGroupService) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new EvaluationGroupModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);
    forkJoin({
      evaluationGroup: this.evaluationGroupService.getById(this.id)
    }).subscribe(result => {
      if (result.evaluationGroup.success) {
        this.form.patchValue(result.evaluationGroup.data);
      }
      this.setLoading(false);
    });
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);

    if (!this.form.valid) return;
    this.setLoading(true);

    this.evaluationGroupService.edit(this.formModel).subscribe(result => {
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
      this.navigateTo(['../..']);

    }, 100);
  }

}
