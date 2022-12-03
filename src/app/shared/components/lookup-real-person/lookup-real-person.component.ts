import { Component, EventEmitter, forwardRef, Injector, OnInit, Output } from '@angular/core';
import { FormGroup, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { BaseComponent } from '../../base/base.component';
import { ResetFormType, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { UsersService } from '../../../../app/modules/panel/account/services/users.service';
import { UsersCriteriaModel } from '../../../../app/modules/panel/account/models/usersCriteria.model';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: { provide: any, useExisting: any, multi: any } = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LookupRealPersonComponent),
  multi: true
};


@Component({
  selector: 'app-lookup-real-person',
  templateUrl: './lookup-real-person.component.html',
  styleUrls: ['./lookup-real-person.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
    UsersService]
})
export class LookupRealPersonComponent extends BaseComponent implements OnInit {

  @Output() onSelect: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  display: boolean = false;

  selectedItems: SelectItem[] = [];
  selecteds: SelectItem[] = [];
  realPersons: any[] = [];
  totalRecords = 0;
  rows = 10;
  cols: any[] = [];
  selectedRow: any;
  loading!: boolean;
  form!: FormGroup;

  criteria!: any;

  private ngControl!: NgControl;

  constructor(route: ActivatedRoute,
    private injector: Injector,
    private formBuilder: RxFormBuilder,
    private userService: UsersService) {
    super(route);
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
    this.generateTable();
    this.generateForm();
  }

  private generateTable() {
    this.cols = [
      { field: 'name', header: 'Pages.User.Name' },
      { field: 'family', header: 'Pages.User.Family' },
      { field: 'email', header: 'Pages.User.Email' },
      { field: 'username', header: 'Pages.User.UserName' },
      { field: 'lastLogin', header: 'Pages.User.LastLogin' },
      { field: 'isActive', header: 'Public.IsActive' }
    ];
  }

  private generateForm() {
    this.criteria = new UsersCriteriaModel();
    this.form = this.formBuilder.formGroup(this.criteria);
  }

  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;

    this.criteria.pageIndex = event ? (event.first! / event.rows!) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;

    //Get Data From Service
    this.userService.getAll(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.realPersons = result.data;
          this.totalRecords = result.data.length;
          this.loading = false;
        }
        else {
          this.loading = false;
        }
      }
    );
  }

  search() {
    this.loadLazy(null);
  }

  clearForm() {
    this.form.reset({ resetType: ResetFormType.ControlsOnly });
  }

  selectBtnClick(rowData: any) {
    this.selecteds = [];
    this.selectedRow = rowData;

    this.selectedItems = this.selectedItems = [
      { label: rowData.v_FullName, value: rowData.realPersonID }
    ]

    this.selecteds.push(rowData.realPersonID);

    this.onSelect.emit(rowData.realPersonID || null);
    this.onChange(rowData.realPersonID || null);

    this.cancelClick();
  }

  cancelClick() {
    setTimeout(() => {
      this.display = false;
    }, 100);
  }

  writeValue(value: any): void {
    this.onSelect.emit(value);
    this.onChange(value);
  }

  updateSelecteds(event: any) {
    let item = this.selecteds[0];
    this.onSelect.emit(item?.value || null);
    this.onChange(item || null);
  }


  onChange = (_: any) => { };
  onTouched = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

}
