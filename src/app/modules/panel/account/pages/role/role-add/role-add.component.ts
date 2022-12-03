import { PublicMessage } from './../../../../../../shared/models/public-message.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { TreeNode } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { PermissionModel } from '../../../models/permission.model';
import { RolesService } from '../../../services/roles.service';
import { RoleModel } from '../../../models/role.model';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: RoleModel;
  disableBtn: boolean = true;
  isSuccessRequest = false;
  permissions: PermissionModel[] = [];
  nodes: TreeNode[];
  node: TreeNode;
  message: string;

  constructor(route: ActivatedRoute, private formBuilder: RxFormBuilder, private service: RolesService, router: Router) {
    super(route);
  }

  ngOnInit() {
    this.message = PublicMessage.NoRecordsFound;

    this.generateForm();
    this.getPermissions();
  }


  private generateForm() {
    this.formModel = new RoleModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  get f() {
    return this.form.controls;
  }

  sendRequest() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    this.formModel.rolePermissions = this.permissions;

    this.service.create(this.formModel).subscribe(
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
    if (this.permissions.findIndex(x => x.permissionId === data) === -1)
      return true;
    else
      return false;
  }

  isUnselect(data: number): number {
    return this.permissions.findIndex(x => x.permissionId === data);
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
      this.permissions.push({ permissionId: event.node.data });

    if (event.node.children !== null) {
      const length = event.node.children.length;
      for (let index = 0; index < length; index++) {
        const element = event.node.children[index];
        if (this.isSelected(element.data))
          this.permissions.push({ permissionId: element.data });
      }
    }

    if (event.node.parent !== null) {
      if (this.isSelected(event.node.parent.data))
        this.permissions.push({ permissionId: event.node.parent.data });
    }

  }

  nodeUnselect(event) {
    const index = this.isUnselect(event.node.data);

    if (index > -1) {
      this.permissions.splice(index, 1);
    }

    if (event.node.children !== null) {
      const length = event.node.children.length;
      for (let index = 0; index < length; index++) {
        const element = event.node.children[index];
        const idx = this.isUnselect(element.data);
        if (idx > -1) {
          this.permissions.splice(idx, 1);
        }
      }
    }
  }

  getPermissions() {
    this.setLoading(true);

    this.service.getAllPermissions().subscribe(
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
