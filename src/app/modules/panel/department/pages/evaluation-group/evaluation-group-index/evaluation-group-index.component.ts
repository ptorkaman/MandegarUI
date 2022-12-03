import { DataService } from './../../../../../../@core/services/data.service';
import { EvaluationGroupService } from './../../../services/evaluation-group.service';
import { PublicMessage } from './../../../../../../shared/models/public-message.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetFormType, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { EvaluationGroupCriteriaModel } from '../../../models/evaluation-group-criteria.model';

@Component({
  selector: 'app-evaluation-group-index',
  templateUrl: './evaluation-group-index.component.html',
  styleUrls: ['./evaluation-group-index.component.scss']
})
export class EvaluationGroupIndexComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  criteria: EvaluationGroupCriteriaModel;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];
  groups: any[] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private confirmationService: ConfirmationService,
    private evaluationGroupService: EvaluationGroupService,
    private dataService: DataService) {
    super(route);

    this.dataService.event.subscribe((result:any) => {
      !!result ? this.loadLazy(null) : null;
    });
  }

  ngOnInit() {
    this.generateTable();
    this.generateForm();
    this.generateMenu();
  }

  private generateForm() {
    this.criteria = new EvaluationGroupCriteriaModel();
    this.form = this.formBuilder.formGroup(this.criteria);
  }

  private generateTable() {
    this.cols = [
      { field: 'name', header: 'Pages.EvaluationGroup.EvaluationGroupName' }
    ];
  }

  private generateMenu() {
    this.btnMenuItems = [
      {
        label: PublicMessage.Edit,
        icon: 'pi pi-pencil', command: () => {
          this.navigateTo(['edit', this.selectedRow.id]);
        }
      },
      {
        label: PublicMessage.Delete,
        icon: 'pi pi-trash', command: () => {
          this.deleteById(this.selectedRow.id);
        }
      }
    ];
  }

  deleteById(id: number) {
    this.confirmationService.confirm({
      message: PublicMessage.DeleteSure,
      accept: () => {
        this.setLoading(true);
        this.evaluationGroupService.deletebyId(id).subscribe(
          result => {
            if (result.success) {
              this.showSuccessMessage(result.message)
              this.setLoading(false);
              this.loadLazy(null);
            }
            else {
              this.setLoading(false);
              this.showErrorMessage(result.message)
            }
          }
        );
      },
    });
  }

  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;

    this.criteria.pageIndex = event ? (event.first / event.rows) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;
    this.criteria.orderBy = (event && event.sortField) ? event.sortField : '1';
    this.criteria.orderAsc = (event && event.sortOrder == 1) ? true : false;

    this.evaluationGroupService.getAll(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.groups = result.data.rows;
          this.totalRecords = result.data.total;
          this.loading = false;
        }
        else {
          this.loading = false;
        }
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  rowBtnClick(menu, rowData, event) {
    this.selectedRow = rowData;
    menu.toggle(event);
  }

  navigateToAdd() {
    this.navigateTo(['add']);
  }

  clearForm() {
    this.form.reset({ resetType: ResetFormType.ControlsOnly });
    this.loadLazy(null);
  }

  search() {
    this.loadLazy(null);
  }

}
