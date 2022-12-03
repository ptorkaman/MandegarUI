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
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: RoleModel;
  disableBtn: boolean = true;
  isSuccessRequest = false;
  permissions: PermissionModel[] = [];
  roleId: number;
  checked = true;
  nodes: TreeNode[];
  selectionNodes: TreeNode[] = [];
  message: string;

  constructor(route: ActivatedRoute, private formBuilder: RxFormBuilder, private service: RolesService, router: Router) {
    super(route);
  }

  ngOnInit() {
    this.message = PublicMessage.NoRecordsFound;
    this.generateForm();
    this.dataBinding();
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



  dataBinding() {

    this.roleId = +this.route.snapshot.params['id'];
    this.setLoading(true);
    this.service.dataBinding(this.roleId).subscribe(result => {
      this.setLoading(false);

      if (result.data !== null) {
        this.form.patchValue({
          name: result.data.role.name
        });

        this.nodes = result.data.root.data;

        const length = result.data.root.data.length;
        const count = result.data.role.rolePermissions.length;

        for (let index = 0; index < length; index++) {
          const allPermissions = result.data.root.data[index];
          for (let idx = 0; idx < count; idx++) {
            const element = result.data.role.rolePermissions[idx];
            if (allPermissions.data === element.permissionId) {
              this.selectionNodes.push(allPermissions);
              this.permissions.push({ permissionId: element.permissionId });
            }


            if (allPermissions.children !== null) {
              const childLength = allPermissions.children.length;
              for (let ind = 0; ind < childLength; ind++) {
                const child = allPermissions.children[ind];
                if (child.data === element.permissionId) {
                  this.selectionNodes.push(child);
                  this.permissions.push({ permissionId: element.permissionId });
                }
              }
            }
          }
        }
      }

    },
      (err) => {

        this.showErrorMessage('ارتباط برقرار نشد');
      });
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

    this.formModel.id = this.roleId;
    this.formModel.rolePermissions = this.permissions;

    this.service.edit(this.formModel).subscribe(
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
