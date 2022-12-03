import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem, TreeNode } from 'primeng/api';
import { PositionModel } from '../../../../base-info/models/position.model';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { AssignPositionModel } from '../../../models/assign-position.model';
import { PositionService } from '../../../../base-info/services/position.service';
import { AssignPositionService } from '../../../services/assign-position.service';
import { StaffService } from '../../../services/staff.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-assign-position-add',
  templateUrl: './assign-position-add.component.html',
  styleUrls: ['./assign-position-add.component.scss']
})
export class AssignPositionAddComponent extends BaseComponent implements OnInit {
  staffList: SelectItem[] = [];
  form: FormGroup;
  formModel: AssignPositionModel;
  disableBtn: boolean = true;
  isSuccessRequest = false;
  positions: PositionModel[] = [];
  nodes: TreeNode[];
  node: TreeNode;
  message: string;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private assignPositionService: AssignPositionService,
    private positionService: PositionService,
    private staffService: StaffService,

    router: Router) {
    super(route);
  }

  ngOnInit() {
    //this.message = PublicMessage.NoRecordsFound;
    this.generateForm();
    this.getPositions();
    this.getData();

  }
  getData() {
    this.setLoading(true);
    forkJoin({
      //staffs: this.staffService.getAllStaffBaseInfo(),
      staffs: this.staffService.getAllStuff(),
      positions: this.positionService.getAll()
    }).subscribe(result => {
      if (result.staffs.success) {
        this.staffList = this.mapToSelectItem(result.staffs.data, 'fullName', 'id');
      }

      this.setLoading(false);
    });
  }

  private generateForm() {
    this.formModel = new AssignPositionModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  get f() {
    return this.form.controls;
  }

  sendRequest() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    this.formModel.positions = this.positions;

    this.assignPositionService.create(this.formModel).subscribe(
      result => {
        this.disableBtn = true;
        this.setLoading(false);

        if (result.success) {
          this.showSuccessMessage(result.message);
          this.navigateBack();
        }
        else {
          this.showErrorMessage(result.message);
        }

        this.disableBtn = true;
        this.setLoading(false);
      },
      (err) => {
        this.showErrorMessage('ارتباط برقرار نشد');
      }
    )
  }

  isSelected(data: number): boolean {
    if (this.positions.findIndex(x => x.positionId === data) === -1)
      return true;
    else
      return false;
  }

  isUnselect(data: number): number {
    return this.positions.findIndex(x => x.positionId === data);
  }

  expandAll() {
    this.nodes.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.nodes.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  nodeSelect(event) {

    if (this.isSelected(event.node.data))
      this.positions.push( event.node.data);

    if (event.node.children !== null) {
      const length = event.node.children.length;
      for (let index = 0; index < length; index++) {
        const element = event.node.children[index];
        if (this.isSelected(element.data))
          this.positions.push( element.data );
      }
    }

    if (event.node.parent !== null) {
      if (this.isSelected(event.node.parent.data))
        this.positions.push( event.node.parent.data );
    }

  }

  nodeUnselect(event) {debugger
    const index = this.isUnselect(event.node.data);

    if (index == -1) {
      this.positions.splice(index, 1);
    }

    if (event.node.children !== null) {
      const length = event.node.children.length;
      for (let index = 0; index < length; index++) {
        const element = event.node.children[index];
        const idx = this.isUnselect(element.data);
        if (idx > -1) {
          this.positions.splice(idx, 1);
        }
      }
    }
  }

  getPositions() {
    this.setLoading(true);

    this.assignPositionService .getAllPositions().subscribe(
      result => {
        this.setLoading(false);
        this.nodes = result.data.data;
      },
      (err) => {
        this.showErrorMessage('ارتباط برقرار نشد');
      }
    )
  }

  cancelClick() {
    this.navigateBack();
  }
}
