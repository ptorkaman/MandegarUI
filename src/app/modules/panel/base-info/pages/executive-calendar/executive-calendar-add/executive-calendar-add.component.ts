import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { SelectItem } from 'primeng/api';
import { ExecutiveCalendarModel } from '../../../models/executive-calendar.model';
import { ExecutiveCalendarService } from '../../../services/executive-calendar.service';
import { DataService } from '../../../../../../@core/services/data.service';
import { AcademicYearService } from '../../../services/academic-year.service';


@Component({
  selector: 'app-executive-calendar-add',
  templateUrl: './executive-calendar-add.component.html',
  styleUrls: ['./executive-calendar-add.component.scss']
})
export class ExecutiveCalendarAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  positionFormModel: ExecutiveCalendarModel;
  academicYearList: SelectItem[] = [];
  genderSelection = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private dataService: DataService,
    private executiveCalendarService: ExecutiveCalendarService,
    private academicYearService: AcademicYearService,
  ) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.positionFormModel = new ExecutiveCalendarModel();
    this.form = this.formBuilder.formGroup(this.positionFormModel);

  }

  getData() {
    this.academicYearService.getAll().subscribe(result => {
      this.academicYearList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.executiveCalendarService.create(this.positionFormModel).subscribe(result => {
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
