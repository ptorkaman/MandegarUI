import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLinks } from '../../../../app/shared/statics/page-links';
import { AssignPositionAddComponent } from './pages/assign-position/assign-position-add/assign-position-add.component';
import { AssignPositionEditComponent } from './pages/assign-position/assign-position-edit/assign-position-edit.component';
import { StaffActivityIndexComponent } from './pages/staff-complementary/staff-activity/staff-activity-index/staff-activity-index.component';
import { StaffAddressComponent } from './pages/staff-complementary/staff-address/staff-address.component';
import { StaffComplementaryIndexComponent } from './pages/staff-complementary/staff-complementary-index/staff-complementary-index.component';
import { StaffComplementaryOutletComponent } from './pages/staff-complementary/staff-complementary-outlet/staff-complementary-outlet.component';
import { StaffFamilyIndexComponent } from './pages/staff-complementary/staff-family/staff-family-index/staff-family-index.component';
import { StaffFinancialIndexComponent } from './pages/staff-complementary/staff-financial/staff-financial-index/staff-financial-index.component';
import { StaffFurtherInformationIndexComponent } from './pages/staff-complementary/staff-further-information/staff-further-information-index/staff-further-information-index.component';
import { StaffResumeIndexComponent } from './pages/staff-complementary/staff-resume/staff-resume-index/staff-resume-index.component';
import { StaffUploadDocumentsIndexComponent } from './pages/staff-complementary/staff-upload-documents/staff-upload-documents-index/staff-upload-documents-index.component';
import { StaffAddComponent } from './pages/staff/staff-add/staff-add.component';
import { StaffEditComponent } from './pages/staff/staff-edit/staff-edit.component';
import { StaffIndexComponent } from './pages/staff/staff-index/staff-index.component';
import { StaffOutletComponent } from './pages/staff/staff-outlet/staff-outlet.component';
import { AssignPositionIndexComponent } from './pages/assign-position/assign-position-index/assign-position-index.component';
import { AssignPositionOutletComponent } from './pages/assign-position/assign-position-outlet/assign-position-outlet.component';
import { StaffFinancialAddComponent } from './pages/staff-complementary/staff-financial/staff-financial-add/staff-financial-add.component';
import { StaffFinancialEditComponent } from './pages/staff-complementary/staff-financial/staff-financial-edit/staff-financial-edit.component';
import { StaffResumeAddComponent } from './pages/staff-complementary/staff-resume/staff-resume-add/staff-resume-add.component';
import { StaffResumeEditComponent } from './pages/staff-complementary/staff-resume/staff-resume-edit/staff-resume-edit.component';
import { StaffActivityAddComponent } from './pages/staff-complementary/staff-activity/staff-activity-add/staff-activity-add.component';
import { StaffActivityEditComponent } from './pages/staff-complementary/staff-activity/staff-activity-edit/staff-activity-edit.component';
import { StaffFamilyAddComponent } from './pages/staff-complementary/staff-family/staff-family-add/staff-family-add.component';
import { StaffFamilyEditComponent } from './pages/staff-complementary/staff-family/staff-family-edit/staff-family-edit.component';
import { StaffCooperationComponent } from './pages/staff-complementary/staff-cooperation/staff-cooperation.component';
import { StaffSacrificeComponent } from './pages/staff-complementary/staff-sacrifice/staff-sacrifice.component';
import { StaffDocumentIndexComponent } from './pages/staff-complementary/staff-document/staff-document-index/staff-document-index.component';
import { StaffDocumentAddComponent } from './pages/staff-complementary/staff-document/staff-document-add/staff-document-add.component';
import { StaffDocumentEditComponent } from './pages/staff-complementary/staff-document/staff-document-edit/staff-document-edit.component';


const routes: Routes = [
  { path: '', redirectTo: `/${PageLinks.Panel}/${PageLinks.Staff}`, pathMatch: 'full' },
  {
    path: PageLinks.AssignPosition, component: AssignPositionOutletComponent,
    children: [
      { path: '', component: AssignPositionIndexComponent },
      { path: PageLinks.AddPage, component: AssignPositionAddComponent },
      { path: PageLinks.EditPage, component: AssignPositionEditComponent },
    ]
  },
  {
    path: '', component: StaffOutletComponent,
    children: [
      { path: '', component: StaffIndexComponent },
      { path: PageLinks.AddPage, component: StaffAddComponent },
      { path: PageLinks.EditPage, component: StaffEditComponent },
      {
        path: PageLinks.StaffComplementary, component: StaffComplementaryOutletComponent,
        children: [
          { path: '', component: StaffComplementaryIndexComponent },
          { path: PageLinks.StaffAddress, component: StaffAddressComponent },
          {
            path: PageLinks.StaffFinancial, component: StaffFinancialIndexComponent,
            children: [
              {
                path: PageLinks.AddPage,
                component: StaffFinancialAddComponent
              },
              {
                path: PageLinks.EditPage,
                component: StaffFinancialEditComponent
              }
            ]
          },
          { path: PageLinks.StaffFurtherInformation, component: StaffFurtherInformationIndexComponent },

          {
            path: PageLinks.StaffDocument, component: StaffDocumentIndexComponent,
            children: [
              {
                path: PageLinks.AddPage, component: StaffDocumentAddComponent,
              },
              {
                path: PageLinks.EditPage, component: StaffDocumentEditComponent,
              }
            ]
          },
          {
            path: PageLinks.StaffResume, component: StaffResumeIndexComponent,
            children: [
              {
                path: PageLinks.AddPage, component: StaffResumeAddComponent
              },
              {
                path: PageLinks.EditPage, component: StaffResumeEditComponent
              }
            ]
          },
          {
            path: PageLinks.StaffActivity, component: StaffActivityIndexComponent,
            children: [
              {
                path: PageLinks.AddPage, component: StaffActivityAddComponent
              },
              {
                path: PageLinks.EditPage, component: StaffActivityEditComponent
              }
            ]
          },
          {
            path: PageLinks.StaffFamily, component: StaffFamilyIndexComponent,
            children: [
              {
                path: PageLinks.AddPage, component: StaffFamilyAddComponent
              },
              {
                path: PageLinks.EditPage, component: StaffFamilyEditComponent
              }
            ]
          },
          { path: PageLinks.StaffCooperation, component: StaffCooperationComponent },
          { path: PageLinks.StaffSacrifice, component: StaffSacrificeComponent },
          { path: PageLinks.StaffUploadDocument, component: StaffUploadDocumentsIndexComponent },

        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
