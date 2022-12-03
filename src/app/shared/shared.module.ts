import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NumericDirective } from './directives/numeric.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultipleTranslateLoaderFactory } from '../@core/translate.module';
import { DateTimeFormatPipe } from './pipes/date-format.pipe';
import { IMaskModule } from 'angular-imask';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RequiredMarkDirective } from './directives/required-mark.directive';
import { PrimeNgModule } from './primeng.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { TreeComponent } from './components/tree/tree.component';
import { LookupRealPersonComponent } from './components/lookup-real-person/lookup-real-person.component';
import { LookupTreeComponent } from './components/lookup-tree/lookup-tree.component';
import { FileuploadComponent } from './components/file-upload/fileupload.component';


@NgModule({
  declarations: [
    NumericDirective,
    TooltipDirective,
    RequiredMarkDirective,

    DateTimeFormatPipe,
    DatePickerComponent,
    ErrorMessagesComponent,
    PageHeaderComponent,
    TreeComponent,
    LookupRealPersonComponent,
    LookupTreeComponent,
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    PrimeNgModule,

    TranslateModule.forRoot({
      defaultLanguage: 'fa',
      loader: {
        provide: TranslateLoader,
        useFactory: MultipleTranslateLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    RxReactiveFormsModule,
    PrimeNgModule,
    TooltipDirective,
    NumericDirective,
    RequiredMarkDirective,
    DateTimeFormatPipe,
    DatePickerComponent,
    ErrorMessagesComponent,
    PageHeaderComponent,
    TreeComponent,
    LookupRealPersonComponent,
    LookupTreeComponent,
    FileuploadComponent
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class SharedModule { }
