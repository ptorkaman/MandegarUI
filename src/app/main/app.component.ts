import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { ReactiveFormConfig, ErrorMessageBindingStrategy } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(iconsLibrary: NbIconLibraries) {
    iconsLibrary.registerFontPack('font-awesome', { packClass: 'fa' });
    iconsLibrary.setDefaultPack('font-awesome');
  }

  ngOnInit(): void {
    this.setReactiveFormConfig();
  }

  setReactiveFormConfig() {
    // rxweb/reactive-form-validators
    ReactiveFormConfig.set({
      baseConfig: {
        dateFormat: "ymd",
        seperator: "-",
        internationalization:
        {
          "dateFormat": "ymd",
          "seperator": "-"
        }
      },
      validationMessage: {
        required: "اجباری می باشد",
        minLength: "حداقل کاراکتر {{1}} است",
        maxLength: "حداکثر کاراکتر {{1}} است",
        maxNumber: "مقدار باید کوچکتر یا مساوی {{1}} باشد",
        minNumber: "مقدار باید بزرگتر یا مساوی {{1}} باشد",
        dateCompareInvalid: 'تاریخ وارد شده در محدوده مجاز نمی باشد',
        email: 'پست الکترونیک را به درستی وارد کنید'
      },
      reactiveForm: { "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnTouchedOrSubmit }
    });
  }
}
