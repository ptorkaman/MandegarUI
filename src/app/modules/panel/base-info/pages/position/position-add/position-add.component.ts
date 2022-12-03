import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { SelectItem } from 'primeng/api';
import { PositionModel } from '../../../models/position.model';
import { PositionService } from '../../../services/position.service';
import { DataService } from './../../../../../../@core/services/data.service';


@Component({
  selector: 'app-position-add',
  templateUrl: './position-add.component.html',
  styleUrls: ['./position-add.component.scss']
})
export class PositionAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  positionFormModel: PositionModel;
  positionList: SelectItem[] = [];
  genderSelection = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    private dataService: DataService,

    private positionService: PositionService,
  ) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.positionFormModel = new PositionModel();
    this.form = this.formBuilder.formGroup(this.positionFormModel);

  }

  getData() {
    this.positionService.getAll().subscribe(result => {
      this.positionList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.positionService.create(this.positionFormModel).subscribe(result => {
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
