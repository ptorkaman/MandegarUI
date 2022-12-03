import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { FieldsetModule } from 'primeng/fieldset';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipsModule } from 'primeng/chips';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeModule } from 'primeng/tree';
import {TimelineModule} from 'primeng/timeline';
import {DataViewModule} from 'primeng/dataview';
import {PickListModule} from 'primeng/picklist';
import {EditorModule} from 'primeng/editor';
@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    InputMaskModule,
    DropdownModule,
    AutoCompleteModule,
    MultiSelectModule,
    KeyFilterModule,
    ChipsModule,
    CheckboxModule,
    RadioButtonModule,
    InputSwitchModule,
    SplitButtonModule,
    TableModule,
    FieldsetModule,
    TabViewModule,
    ToolbarModule,
    FileUploadModule,
    ProgressBarModule,
    MenuModule,
    DialogModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    ToastModule,
    ContextMenuModule,
    ListboxModule,
    BadgeModule,
    TooltipModule,
    PanelModule,
    SelectButtonModule,
    TreeModule,
    TimelineModule,
    DataViewModule,
    PickListModule,
    EditorModule
  ]
})
export class PrimeNgModule { }
