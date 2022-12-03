import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { ExecutiveCalendarModel } from '../../../models/executive-calendar.model';
import { forkJoin } from 'rxjs';
import { ExecutiveCalendarService } from '../../../services/executive-calendar.service';
import { SelectItem } from 'primeng/api';
import { DataService } from '../../../../../../@core/services/data.service';
import { AcademicYearService } from '../../../services/academic-year.service';

@Component({
  selector: "app-executive-calendar-edit",
  templateUrl: "./executive-calendar-edit.component.html",
  styleUrls: ["./executive-calendar-edit.component.scss"],
})
export class ExecutiveCalendarEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: ExecutiveCalendarModel;
  id: number;
  academicYearList: SelectItem[] = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private dataService: DataService,
    private executiveCalendarService: ExecutiveCalendarService,
    private academicYearService: AcademicYearService,  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();

  }

  private generateForm() {
    this.formModel = new ExecutiveCalendarModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);

    forkJoin({
      academicYears: this.academicYearService.getAll(),
      executiveCalendar: this.executiveCalendarService.getById(this.id)
    }).subscribe(result => {
      if (result.academicYears.success) {
        this.academicYearList = this.mapToSelectItem(result.academicYears.data, 'name', 'id');
      }

      if (result.executiveCalendar.success) {
        this.form.patchValue({
          name: result.executiveCalendar.data.name,
          academicYearId: result.executiveCalendar.data.academicYearId,
          id: result.executiveCalendar.data.id,
        });
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

    this.executiveCalendarService.edit(this.formModel).subscribe(result => {
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
      this.navigateTo(['../..']);

    }, 100);
  }


}
