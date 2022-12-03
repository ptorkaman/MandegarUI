import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { SelectItem } from 'primeng/api';
import { DepartmentActivityModel } from '../../../models/department-activity.model';
import { DepartmentActivityService } from '../../../services/department-activity.service';
import { DepartmentService } from '../../../services/department.service';
import { ImagePreview } from '../../../../../../shared/functions/index';


@Component({
  selector: 'app-department-activity-add',
  templateUrl: './department-activity-add.component.html',
  styleUrls: ['./department-activity-add.component.scss']
})
export class DepartmentActivityAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  departmentActivityFormModel: DepartmentActivityModel;
  departmentActivityGroupList: SelectItem[] = [];
  genderSelection = [];
  departmentList=[];
  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentActivityService: DepartmentActivityService,
    private departmentService: DepartmentService,
  ) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
    ImagePreview();
  }

  private generateForm() {
    this.departmentActivityFormModel = new DepartmentActivityModel();
    this.form = this.formBuilder.formGroup(this.departmentActivityFormModel);

  }

  getData() {
    this.departmentService.getAll().subscribe(result => {
      this.departmentList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.departmentActivityService.create(this.departmentActivityFormModel).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);
        this.cancelClick();
      }
      else {
        this.showErrorMessage(result.message);
        this.setLoading(false);
      }
    })
  }
  cancelClick() {
    this.navigateBack();
  }
  handleUpload(event) {
    const fileType = event.target.files[0]['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      this.departmentActivityFormModel.attachmentFile = '';
    }
    else {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.departmentActivityFormModel.attachmentFile = reader.result.toString();
      };
    }
  }
}
