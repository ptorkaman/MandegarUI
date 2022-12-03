import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffService } from './services/staff.service';
import { PositionService } from '../base-info/services/position.service';
import { DepartmentService } from '../base-info/services/department.service';
import { CooperationTypeService } from '../base-info/services/cooperation-type.service';
import { StaffAddComponent } from './pages/staff/staff-add/staff-add.component';
import { StaffEditComponent } from './pages/staff/staff-edit/staff-edit.component';
import { StaffIndexComponent } from './pages/staff/staff-index/staff-index.component';
import { StaffOutletComponent } from './pages/staff/staff-outlet/staff-outlet.component';
import { StaffComplementaryIndexComponent } from './pages/staff-complementary/staff-complementary-index/staff-complementary-index.component';
import { StaffComplementaryOutletComponent } from './pages/staff-complementary/staff-complementary-outlet/staff-complementary-outlet.component';
import { StaffFurtherInformationIndexComponent } from './pages/staff-complementary/staff-further-information/staff-further-information-index/staff-further-information-index.component';
import { StaffDocumentAddComponent } from './pages/staff-complementary/staff-document/staff-document-add/staff-document-add.component';
import { StaffActivityIndexComponent } from './pages/staff-complementary/staff-activity/staff-activity-index/staff-activity-index.component';
import { StaffFamilyIndexComponent } from './pages/staff-complementary/staff-family/staff-family-index/staff-family-index.component';
import { StaffUploadDocumentsIndexComponent } from './pages/staff-complementary/staff-upload-documents/staff-upload-documents-index/staff-upload-documents-index.component';
import { StaffFinancialIndexComponent } from './pages/staff-complementary/staff-financial/staff-financial-index/staff-financial-index.component';
import { StaffResumeIndexComponent } from './pages/staff-complementary/staff-resume/staff-resume-index/staff-resume-index.component';
import { StaffAddressComponent } from './pages/staff-complementary/staff-address/staff-address.component';
import { StaffAddressService } from './services/staff-address.service';
import { StaffInfoComponent } from './components/staff-info/staff-info.component';
import { AssignPositionIndexComponent } from './pages/assign-position/assign-position-index/assign-position-index.component';
import { AssignPositionAddComponent } from './pages/assign-position/assign-position-add/assign-position-add.component';
import { AssignPositionEditComponent } from './pages/assign-position/assign-position-edit/assign-position-edit.component';
import { AssignPositionOutletComponent } from './pages/assign-position/assign-position-outlet/assign-position-outlet.component';
import { AssignPositionService } from './services/assign-position.service';
import { StaffComplementaryService } from './services/staff-complementary.service';
import { StaffFinancialService } from './services/staff-financial.service';
import { StaffFinancialAddComponent } from './pages/staff-complementary/staff-financial/staff-financial-add/staff-financial-add.component';
import { StaffFinancialEditComponent } from './pages/staff-complementary/staff-financial/staff-financial-edit/staff-financial-edit.component';
import { StaffResumeService } from './services/staff-resume.service';
import { StaffResumeAddComponent } from './pages/staff-complementary/staff-resume/staff-resume-add/staff-resume-add.component';
import { StaffResumeEditComponent } from './pages/staff-complementary/staff-resume/staff-resume-edit/staff-resume-edit.component';
import { StaffActivityService } from './services/staff-activity.service';
import { StaffActivityAddComponent } from './pages/staff-complementary/staff-activity/staff-activity-add/staff-activity-add.component';
import { StaffActivityEditComponent } from './pages/staff-complementary/staff-activity/staff-activity-edit/staff-activity-edit.component';
import { StaffFamilyAddComponent } from './pages/staff-complementary/staff-family/staff-family-add/staff-family-add.component';
import { StaffFamilyEditComponent } from './pages/staff-complementary/staff-family/staff-family-edit/staff-family-edit.component';
import { StaffCooperationComponent } from './pages/staff-complementary/staff-cooperation/staff-cooperation.component';
import { StaffCooperationService } from './services/staff-cooperation.service';
import { StaffSacrificeService } from './services/staff-sacrifice.service';
import { StaffSacrificeComponent } from './pages/staff-complementary/staff-sacrifice/staff-sacrifice.component';
import { SacrificeDurationComponent } from './components/sacrifice-duration/sacrifice-duration.component';
import { StaffDocumentIndexComponent } from './pages/staff-complementary/staff-document/staff-document-index/staff-document-index.component';
import { StaffDocumentEditComponent } from './pages/staff-complementary/staff-document/staff-document-edit/staff-document-edit.component';
import { StaffEducationDocumentService } from './services/staff-education-document.service';
@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ],
  declarations: [
    StaffOutletComponent,
    StaffIndexComponent,
    StaffAddComponent,
    StaffEditComponent,

    StaffComplementaryOutletComponent,
    StaffComplementaryIndexComponent,
    StaffFinancialIndexComponent,
    StaffFinancialAddComponent,
    StaffFinancialEditComponent,
    StaffFurtherInformationIndexComponent,
    StaffDocumentIndexComponent,
    StaffDocumentAddComponent,
    StaffDocumentEditComponent,
    StaffResumeIndexComponent,
    StaffResumeAddComponent,
    StaffResumeEditComponent,
    StaffActivityIndexComponent,
    StaffActivityAddComponent,
    StaffActivityEditComponent,
    StaffFamilyIndexComponent,
    StaffFamilyAddComponent,
    StaffFamilyEditComponent,
    StaffCooperationComponent,
    StaffSacrificeComponent,
    StaffUploadDocumentsIndexComponent,

    StaffInfoComponent,
    SacrificeDurationComponent,
    StaffAddressComponent,

    AssignPositionOutletComponent,
    AssignPositionIndexComponent,
    AssignPositionAddComponent,
    AssignPositionEditComponent,
  ],
  providers: [
    StaffService,
    PositionService,
    DepartmentService,
    CooperationTypeService,
    StaffAddressService,
    AssignPositionService,
    StaffComplementaryService,
    StaffFinancialService,
    StaffResumeService,
    StaffActivityService,
    StaffCooperationService,
    StaffSacrificeService,
    StaffEducationDocumentService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class StaffModule { }
