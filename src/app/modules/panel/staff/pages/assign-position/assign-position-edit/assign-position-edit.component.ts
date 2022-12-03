import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem, TreeNode } from 'primeng/api';
import { PositionModel } from '../../../../base-info/models/position.model';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { AssignPositionModel } from '../../../models/assign-position.model';
import { AssignPositionService } from '../../../services/assign-position.service';
import { StaffService } from '../../../services/staff.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-assign-position-edit',
  templateUrl: './assign-position-edit.component.html',
  styleUrls: ['./assign-position-edit.component.scss']
})
export class AssignPositionEditComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: AssignPositionModel;
  disableBtn: boolean = true;
  isSuccessRequest = false;
  positions: PositionModel[] = [];
  id: number;
  checked = true;
  nodes: TreeNode[];
  selectionNodes: TreeNode[] = [];
  message: string;
  staffList: SelectItem[] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private assignPositionService: AssignPositionService,
    private staffService: StaffService,
    router: Router) {
    super(route);
  }

  ngOnInit() {
    //this.message = PublicMessage.NoRecordsFound;
    this.generateForm();
    this.dataBinding();
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
      this.positions.push( event.node.data );

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



  dataBinding() {

    this.id = +this.route.snapshot.params['id'];
    this.setLoading(true);
    forkJoin({
      staffs: this.staffService.getAllStaffBaseInfo(),
      staff:this.staffService.UpdatePreparation(this.id),
      assignPosition:this.assignPositionService.getById(this.id)
    }).subscribe(result => {
      if (result.assignPosition.success) {
        this.form.patchValue({
          staffId: result.assignPosition.data[0].staffId
        });      }
      if (result.staffs.success) {
        this.staffList = this.mapToSelectItem(result.staffs.data, 'fullName', 'id');
      }

      if (result.staff.success) {
        if (result.staff.data !== null) {

          this.nodes = result.staff.data.root.data;
          const count = result.staff.data.staff.assignPositions.length;
          const  length= result.staff.data.root.data.length;

          for (let index = 0; index < length; index++) {
            const allPositions = result.staff.data.root.data[index];
            for (let idx = 0; idx < count; idx++) {
              const element = result.staff.data.staff.assignPositions[idx];
              if (allPositions.data === element.positionId) {
                this.selectionNodes.push(allPositions);
                this.positions.push( element.positionId );
              }

              if (allPositions.children !== null) {
                const childLength = allPositions.children.length;
                for (let ind = 0; ind < childLength; ind++) {
                  const child = allPositions.children[ind];
                  if (child.data === element.positionId) {
                    this.selectionNodes.push(child);
                    this.positions.push( element.positionId );
                  }
                }
              }
            }
          }
        }
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

    this.formModel.id = this.id;
    this.formModel.positions = this.positions;

    this.assignPositionService.edit(this.formModel).subscribe(
      result => {
        this.disableBtn = true;
        this.setLoading(false);

        if (result.success) {
          this.showSuccessMessage(result.message);
          this.navigateTo(['../..'])
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


  cancelClick() {
    this.navigateTo(['../..'])
  }

}
