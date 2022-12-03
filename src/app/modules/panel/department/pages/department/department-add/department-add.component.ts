import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentModel } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department.service';
import { DataService } from './../../../../../../@core/services/data.service';



@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  departmentFormModel: DepartmentModel;
  genderSelection = [];
  display: boolean = true;
  departmentList=[];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    private dataService: DataService,

    private departmentService: DepartmentService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }
  getData() {
    this.departmentService.getAll().subscribe(result => {
      this.departmentList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }
  private generateForm() {
    this.departmentFormModel = new DepartmentModel();
    this.form = this.formBuilder.formGroup(this.departmentFormModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.departmentService.create(this.departmentFormModel).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);        this.dataService.sendData(true);

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
