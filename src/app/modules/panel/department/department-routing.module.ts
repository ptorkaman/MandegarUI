import { EvaluationGroupIndexComponent } from './pages/evaluation-group/evaluation-group-index/evaluation-group-index.component';
import { SessionApprovalsOutletComponent } from './pages/session-approvals/session-approvals-outlet/session-approvals-outlet.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageLinks } from "../../../../app/shared/statics/page-links";
import { DepartmentActivityTypeAddComponent } from "./pages/department-activity-type/department-activity-type-add/department-activity-type-add.component";
import { DepartmentActivityTypeEditComponent } from "./pages/department-activity-type/department-activity-type-edit/department-activity-type-edit.component";
import { DepartmentActivityTypeIndexComponent } from "./pages/department-activity-type/department-activity-type-index/department-activity-type-index.component";
import { DepartmentActivityAddComponent } from "./pages/department-activity/department-activity-add/department-activity-add.component";
import { DepartmentActivityEditComponent } from "./pages/department-activity/department-activity-edit/department-activity-edit.component";
import { DepartmentActivityIndexComponent } from "./pages/department-activity/department-activity-index/department-activity-index.component";
import { DepartmentActivityOutletComponent } from "./pages/department-activity/department-activity-outlet/department-activity-outlet.component";
import { DepartmentLessonAddComponent } from "./pages/department-lesson/department-lesson-add/department-member-add.component";
import { DepartmentLessonEditComponent } from "./pages/department-lesson/department-lesson-edit/department-lesson-edit.component";
import { DepartmentLessonIndexComponent } from "./pages/department-lesson/department-lesson-index/department-lesson-index.component";
import { DepartmentMeetingAttendeesAddComponent } from "./pages/department-meeting-attendees/department-meeting-attendees-add/department-meeting-attendees-add.component";
import { DepartmentMeetingAttendeesEditComponent } from "./pages/department-meeting-attendees/department-meeting-attendees-edit/department-meeting-attendees-edit.component";
import { DepartmentMeetingAttendeesIndexComponent } from "./pages/department-meeting-attendees/department-meeting-attendees-index/department-meeting-attendees-index.component";
import { DepartmentMeetingAttendeesOutletComponent } from "./pages/department-meeting-attendees/department-meeting-attendees-outlet/department-meeting-attendees-outlet.component";
import { DepartmentMeetingMemberAddComponent } from "./pages/department-meeting-member/department-meeting-member-add/department-meeting-member-add.component";
import { DepartmentMeetingMemberEditComponent } from "./pages/department-meeting-member/department-meeting-member-edit/department-meeting-member-edit.component";
import { DepartmentMeetingMemberIndexComponent } from "./pages/department-meeting-member/department-meeting-member-index/department-meeting-member-index.component";
import { DepartmentMeetingMemberOutletComponent } from "./pages/department-meeting-member/department-meeting-member-outlet/department-meeting-member-outlet.component";
import { DepartmentMeetingAddComponent } from "./pages/department-meeting/department-meeting-add/department-meeting-add.component";
import { DepartmentMeetingEditComponent } from "./pages/department-meeting/department-meeting-edit/department-meeting-edit.component";
import { DepartmentMeetingIndexComponent } from "./pages/department-meeting/department-meeting-index/department-meeting-index.component";
import { DepartmentMeetingOutletComponent } from "./pages/department-meeting/department-meeting-outlet/department-meeting-outlet.component";
import { DepartmentMemberAddComponent } from "./pages/department-member/department-member-add/department-member-add.component";
import { DepartmentMemberEditComponent } from "./pages/department-member/department-member-edit/department-member-edit.component";
import { DepartmentMemberIndexComponent } from "./pages/department-member/department-member-index/department-member-index.component";
import { DepartmentScheduleAddComponent } from "./pages/department-schedule/department-schedule-add/department-schedule-add.component";
import { DepartmentScheduleEditComponent } from "./pages/department-schedule/department-schedule-edit/department-schedule-edit.component";
import { DepartmentScheduleIndexComponent } from "./pages/department-schedule/department-schedule-index/department-schedule-index.component";
import { DepartmentAddComponent } from "./pages/department/department-add/department-add.component";
import { DepartmentEditComponent } from "./pages/department/department-edit/department-edit.component";
import { DepartmentIndexComponent } from "./pages/department/department-index/department-index.component";
import { DepartmentOutletComponent } from "./pages/department/department-outlet/department-outlet.component";
import { ProceedingsDepartmentAddComponent } from "./pages/proceedings-department/proceedings-department-add/proceedings-department-add.component";
import { ProceedingsDepartmentEditComponent } from "./pages/proceedings-department/proceedings-department-edit/proceedings-department-edit.component";
import { ProceedingsDepartmentIndexComponent } from "./pages/proceedings-department/proceedings-department-index/proceedings-department-index.component";
import { ProceedingsDepartmentOutletComponent } from "./pages/proceedings-department/proceedings-department-outlet/proceedings-department-outlet.component";
import { SessionApprovalsAddComponent } from './pages/session-approvals/session-approvals-add/session-approvals-add.component';
import { SessionApprovalsEditComponent } from './pages/session-approvals/session-approvals-edit/session-approvals-edit.component';
import { SessionApprovalsIndexComponent } from './pages/session-approvals/session-approvals-index/session-approvals-index.component';
import { EvaluationGroupAddComponent } from './pages/evaluation-group/evaluation-group-add/evaluation-group-add.component';
import { EvaluationGroupEditComponent } from './pages/evaluation-group/evaluation-group-edit/evaluation-group-edit.component';

const routes: Routes = [
  { path: '', redirectTo: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.Department}`, pathMatch: 'full' },

  {
    path: PageLinks.Department, component: DepartmentIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: DepartmentAddComponent },
      { path: PageLinks.EditPage, component: DepartmentEditComponent },
    ]
  },
  // {
  //   path: PageLinks.DepartmentLesson, component: DepartmentLessonOutletComponent,
  //   children: [
  //     { path: '', component: DepartmentLessonIndexComponent },
  //     { path: PageLinks.AddPage, component: DepartmentLessonAddComponent },
  //     { path: PageLinks.EditPage, component: DepartmentLessonEditComponent },
  //   ]
  // },
  {
    path: PageLinks.DepartmentActivityType, component: DepartmentActivityTypeIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: DepartmentActivityTypeAddComponent },
      { path: PageLinks.EditPage, component: DepartmentActivityTypeEditComponent },
    ]
  },
  {
    path: PageLinks.DepartmentActivity, component: DepartmentActivityOutletComponent,
    children: [
      { path: '', component: DepartmentActivityIndexComponent },
      { path: PageLinks.AddPage, component: DepartmentActivityAddComponent },
      { path: PageLinks.EditPage, component: DepartmentActivityEditComponent },
    ]
  },
  {
    path: PageLinks.DepartmentMember, component: DepartmentMemberIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: DepartmentMemberAddComponent },
      { path: PageLinks.EditPage, component: DepartmentMemberEditComponent },
    ]
  },
  {
    path: PageLinks.DepartmentMeeting, component: DepartmentMeetingOutletComponent,
    children: [
      { path: '', component: DepartmentMeetingIndexComponent },
      { path: PageLinks.AddPage, component: DepartmentMeetingAddComponent },
      { path: PageLinks.EditPage, component: DepartmentMeetingEditComponent },
    ]
  },
  {
    path: PageLinks.DepartmentMeetingMember, component: DepartmentMeetingMemberOutletComponent,
    children: [
      { path: '', component: DepartmentMeetingMemberIndexComponent },
      { path: PageLinks.AddPage, component: DepartmentMeetingMemberAddComponent },
      { path: PageLinks.EditPage, component: DepartmentMeetingMemberEditComponent },
    ]
  },
  {
    path: PageLinks.ProceedingsDepartment, component: ProceedingsDepartmentOutletComponent,
    children: [
      { path: '', component: ProceedingsDepartmentIndexComponent },
      { path: PageLinks.AddPage, component: ProceedingsDepartmentAddComponent },
      { path: PageLinks.EditPage, component: ProceedingsDepartmentEditComponent },
    ]
  },
  {
    path: PageLinks.DepartmentMeetingAttendees, component: DepartmentMeetingAttendeesOutletComponent,
    children: [
      { path: '', component: DepartmentMeetingAttendeesIndexComponent },
      { path: PageLinks.AddPage, component: DepartmentMeetingAttendeesAddComponent },
      { path: PageLinks.EditPage, component: DepartmentMeetingAttendeesEditComponent },
    ]
  },
  {
    path: PageLinks.SessionApprovals, component: SessionApprovalsOutletComponent,
    children: [
      { path: '', component: SessionApprovalsIndexComponent },
      { path: PageLinks.AddPage, component: SessionApprovalsAddComponent },
      { path: PageLinks.EditPage, component: SessionApprovalsEditComponent },
    ]
  },
  {
    path: PageLinks.DepartmentMember, component: DepartmentMemberIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: DepartmentMemberAddComponent },
      { path: PageLinks.EditPage, component: DepartmentMemberEditComponent },
    ]
  },
  {
    path: PageLinks.DepartmentLesson, component: DepartmentLessonIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: DepartmentLessonAddComponent },
      { path: PageLinks.EditPage, component: DepartmentLessonEditComponent },
    ]
  },
  {
    path: PageLinks.DepartmentSchedule, component: DepartmentScheduleIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: DepartmentScheduleAddComponent },
      { path: PageLinks.EditPage, component: DepartmentScheduleEditComponent },
    ]
  },
  {
    path: PageLinks.EvaluationGroup, component: EvaluationGroupIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: EvaluationGroupAddComponent },
      { path: PageLinks.EditPage, component: EvaluationGroupEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
