import { TreeSelectionModeEnum } from './../../models/tree-selection-mode-enum.model';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../app/shared/base/base.component';
import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeReturnTypeEnum } from '../../models/tree-return-type-enum.model';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: { provide: any, useExisting: any, multi: any } = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LookupTreeComponent),
  multi: true
};


@Component({
  selector: 'app-lookup-tree',
  templateUrl: './lookup-tree.component.html',
  styleUrls: ['./lookup-tree.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class LookupTreeComponent extends BaseComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() returnType: TreeReturnTypeEnum = TreeReturnTypeEnum.Id;
  @Input() selectionMode: TreeSelectionModeEnum = TreeSelectionModeEnum.single;
  @Output() onSelect: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @Input() expand: boolean = false;

  display: boolean = false;
  selectedItems: SelectItem[] = [];
  selecteds: SelectItem[] = [];

  showModalFooterButtons: boolean = false;

  private ngControl!: NgControl;

  constructor(route: ActivatedRoute, private injector: Injector) {
    super(route);
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
    this.showModalFooterButtons = this.selectionMode == TreeSelectionModeEnum.checkbox ? true : false;

  }

  selectedIds(event: any): void {

    this.selecteds = [];

    if (this.selectionMode === TreeSelectionModeEnum.checkbox) {
      this.selectedItems = this.mapToSelectItem(event, 'title', 'id');
      this.selectedItems.forEach((item: any) => {
        this.selecteds.push(item.value)
      });
    }
    else {
      this.selectedItems = [
        { label: event.title, value: event.id }
      ]
      this.selecteds.push(event.id)
    }

    if (this.showModalFooterButtons === false) {
      this.acceptClick();
    }
  }

  writeValue(value: any): void {
    this.onSelect.emit(value || null);
    this.onChange(value || null);
  }


  changeValue(): void {
    this.emitValue();

  }

  acceptClick() {
    this.emitValue();

    setTimeout(() => {
      this.display = false;
    }, 100);
  }

  cancelClick() {
    setTimeout(() => {
      this.display = false;
    }, 100);
  }

  emitValue() {
    if (this.selectionMode === TreeSelectionModeEnum.checkbox) {
      this.onSelect.emit(this.selecteds || null);
      this.onChange(this.selecteds || null);
    }
    else if (this.selectionMode === TreeSelectionModeEnum.single) {
      var item = this.selecteds[0];
      this.onSelect.emit(item.value || null);
      this.onChange(item || null);
    }
  }

  updateSelecteds(event: any) {
    this.selecteds = event;

    if (this.selectionMode === TreeSelectionModeEnum.checkbox) {
      this.onSelect.emit(this.selecteds || null);
      this.onChange(this.selecteds || null);
    }
    else if (this.selectionMode === TreeSelectionModeEnum.single) {
      let item = this.selecteds[0];
      this.onSelect.emit(item?.value || null);
      this.onChange(item || null);
    }
  }

  onChange = (_: any) => { };
  onTouched = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
