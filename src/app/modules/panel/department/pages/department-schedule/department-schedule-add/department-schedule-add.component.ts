import { DataService } from '../../../../../../@core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentScheduleModel } from '../../../models/department-schedule.model';
import { DepartmentScheduleService } from '../../../services/department-schedule.service';
import { SelectItem } from 'primeng/api';
import { ExecutiveCalendarService } from '../../../../base-info/services/executive-calendar.service';



@Component({
  selector: 'app-department-schedule-add',
  templateUrl: './department-schedule-add.component.html',
  styleUrls: ['./department-schedule-add.component.scss']
})
export class DepartmentScheduleAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: DepartmentScheduleModel;
  genderSelection = [];
  display: boolean = true;
  executiveCalendarList:SelectItem[] = [];
  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private dataService: DataService,
    private executiveCalendarService: ExecutiveCalendarService,
    private departmentScheduleService: DepartmentScheduleService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }
  getData() {
    this.executiveCalendarService.getAll().subscribe(result => {
      this.executiveCalendarList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }
  private generateForm() {
    this.formModel = new DepartmentScheduleModel();
    this.form = this.formBuilder.formGroup(this.formModel);

  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.departmentScheduleService.create(this.formModel).subscribe(result => {
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
