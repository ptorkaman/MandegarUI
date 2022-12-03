import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RxFormBuilder } from "@rxweb/reactive-form-validators";
import { BaseComponent } from "../../../../../../shared/base/base.component";
import { AssignTaskModel } from "../../../models/assign-task.model";
import { AssignTaskService } from "../../../services/assign-task.service";
import { forkJoin } from "rxjs";
import { TaskService } from "../../../services/task.service";
import { PositionService } from "../../../services/position.service";
import { DataService } from "./../../../../../../@core/services/data.service";
import { SelectItem } from "primeng/api";
import { TaskGroupService } from "../../../services/task-group.service";
import { now } from "jquery";

@Component({
  selector: "app-assign-task-edit",
  templateUrl: "./assign-task-edit.component.html",
  styleUrls: ["./assign-task-edit.component.scss"],
})
export class AssignTaskEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  assignTaskFormModel: AssignTaskModel;
  assignTaskGroupList: SelectItem[] = [];
  genderSelection = [];
  positionList = [];
  taskList = [];
  selectTaskList = [];
  display: boolean = true;
  TaskGroupList: SelectItem[] = [];
  id: number;
  constructor(
    route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private assignTaskService: AssignTaskService,
    private dataService: DataService,
    private taskGroupService: TaskGroupService,
    private taskService: TaskService,
    private positionService: PositionService
  ) {
    super(route);
    this.id = +this.getRouteValue(route, "id");
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.assignTaskFormModel = new AssignTaskModel();
    this.form = this.formBuilder.formGroup(this.assignTaskFormModel);
  }

  getData() {
    this.setLoading(true);
    forkJoin({
      taskGroups: this.taskGroupService.getAll(),
      positions: this.positionService.getAll(),
      assignTask: this.assignTaskService.getAllByPositionId(this.id),
    }).subscribe((result) => {
      if (result.assignTask.success) {
        this.form.patchValue({
          positionId: result.assignTask.data[0].positionId,
          taskGroupId: result.assignTask.data[0].taskGroupId,
        });
        this.selectTaskList = result.assignTask.data;

      }
      if (result.taskGroups.success) {
        this.TaskGroupList = this.mapToSelectItem(
          result.taskGroups.data,
          "name",
          "id"
        );
      }
      if (result.positions.success) {
        this.positionList = this.mapToSelectItem(
          result.positions.data,
          "name",
          "id"
        );
      }
      this.setLoading(false);
    });
  }
  getAlltask() {
    this.setLoading(true);
    var data = this.assignTaskFormModel.taskGroupId;
    if (data != undefined) {
      this.taskService.GetAllByTaskGroupId(data).subscribe((result: any) => {
        if (result.success) {
            this.taskList = result.data;
            let list = this.taskList.filter(ar => !this.selectTaskList.find(rm => (rm.id === ar.id ) ))
            this.taskList =list;
          this.setLoading(false);
        } else {
          this.setLoading(false);
        }
      });
    }
  }
  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);
    this.assignTaskFormModel.selectTaskList = this.selectTaskList;
    this.assignTaskService
      .edit(this.assignTaskFormModel)
      .subscribe((result) => {
        if (result.success) {
          this.showSuccessMessage(result.message);
          this.setLoading(false);
          this.dataService.sendData(true);

          this.cancelClick();
        } else {
          this.showErrorMessage(result.message);
          this.setLoading(false);
        }
      });
  }
  cancelClick() {
    this.display = false;
    setTimeout(() => {
      this.navigateTo(['../..']);
    }, 100);
  }
}
