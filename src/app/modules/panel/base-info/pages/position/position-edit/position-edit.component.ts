import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { PositionModel } from '../../../models/position.model';
import { forkJoin } from 'rxjs';
import { PositionService } from '../../../services/position.service';
import { SelectItem } from 'primeng/api';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: "app-position-edit",
  templateUrl: "./position-edit.component.html",
  styleUrls: ["./position-edit.component.scss"],
})
export class PositionEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: PositionModel;
  id: number;
  positionList: SelectItem[] = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    private dataService: DataService,

    private positionService: PositionService,
  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();

  }

  private generateForm() {
    this.formModel = new PositionModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);

    forkJoin({
      positions: this.positionService.getAll(),
      position: this.positionService.getById(this.id)
    }).subscribe(result => {
      if (result.positions.success) {
        this.positionList = this.mapToSelectItem(result.positions.data, 'name', 'id');
      }

      if (result.position.success) {
        this.form.patchValue({
          name: result.position.data.name,
          parentId: result.position.data.parentId,
          id: result.position.data.id,
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

    this.positionService.edit(this.formModel).subscribe(result => {
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
