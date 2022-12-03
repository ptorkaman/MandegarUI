import { DepartmentMeetingAttendeesService } from './services/department-meeting-attendees.service';
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { DepartmentActivityOutletComponent } from "./pages/department-activity/department-activity-outlet/department-activity-outlet.component";
import { DepartmentActivityIndexComponent } from "./pages/department-activity/department-activity-index/department-activity-index.component";
import { DepartmentActivityAddComponent } from "./pages/department-activity/department-activity-add/department-activity-add.component";
import { DepartmentActivityEditComponent } from "./pages/department-activity/department-activity-edit/department-activity-edit.component";
import { DepartmentActivityService } from "./services/department-activity.service";
import { DepartmentActivityTypeService } from "./services/department-activity-type.service";
import { DepartmentActivityTypeOutletComponent } from "./pages/department-activity-type/department-activity-type-outlet/department-activity-type-outlet.component";
import { DepartmentActivityTypeAddComponent } from "./pages/department-activity-type/department-activity-type-add/department-activity-type-add.component";
import { DepartmentActivityTypeIndexComponent } from "./pages/department-activity-type/department-activity-type-index/department-activity-type-index.component";
import { DepartmentActivityTypeEditComponent } from "./pages/department-activity-type/department-activity-type-edit/department-activity-type-edit.component";
import { DepartmentEditComponent } from "./pages/department/department-edit/department-edit.component";
import { DepartmentAddComponent } from "./pages/department/department-add/department-add.component";
import { DepartmentIndexComponent } from "./pages/department/department-index/department-index.component";
import { DepartmentOutletComponent } from "./pages/department/department-outlet/department-outlet.component";
import { DepartmentService } from "./services/department.service";
import { DepartmentRoutingModule } from "./department-routing.module";
import { DepartmentMeetingEditComponent } from "./pages/department-meeting/department-meeting-edit/department-meeting-edit.component";
import { DepartmentMeetingAddComponent } from "./pages/department-meeting/department-meeting-add/department-meeting-add.component";
import { DepartmentMeetingIndexComponent } from "./pages/department-meeting/department-meeting-index/department-meeting-index.component";
import { DepartmentMeetingOutletComponent } from "./pages/department-meeting/department-meeting-outlet/department-meeting-outlet.component";
import { DepartmentMeetingMemberAddComponent } from "./pages/department-meeting-member/department-meeting-member-add/department-meeting-member-add.component";
import { DepartmentMeetingMemberEditComponent } from "./pages/department-meeting-member/department-meeting-member-edit/department-meeting-member-edit.component";
import { DepartmentMeetingMemberIndexComponent } from "./pages/department-meeting-member/department-meeting-member-index/department-meeting-member-index.component";
import { DepartmentMeetingMemberOutletComponent } from "./pages/department-meeting-member/department-meeting-member-outlet/department-meeting-member-outlet.component";
import { ProceedingsDepartmentAddComponent } from "./pages/proceedings-department/proceedings-department-add/proceedings-department-add.component";
import { ProceedingsDepartmentEditComponent } from "./pages/proceedings-department/proceedings-department-edit/proceedings-department-edit.component";
import { ProceedingsDepartmentIndexComponent } from "./pages/proceedings-department/proceedings-department-index/proceedings-department-index.component";
import { ProceedingsDepartmentOutletComponent } from "./pages/proceedings-department/proceedings-department-outlet/proceedings-department-outlet.component";
import { DepartmentMeetingAttendeesAddComponent } from "./pages/department-meeting-attendees/department-meeting-attendees-add/department-meeting-attendees-add.component";
import { DepartmentMeetingAttendeesEditComponent } from "./pages/department-meeting-attendees/department-meeting-attendees-edit/department-meeting-attendees-edit.component";
import { DepartmentMeetingAttendeesIndexComponent } from "./pages/department-meeting-attendees/department-meeting-attendees-index/department-meeting-attendees-index.component";
import { DepartmentMeetingAttendeesOutletComponent } from "./pages/department-meeting-attendees/department-meeting-attendees-outlet/department-meeting-attendees-outlet.component";
import {CalendarModule} from 'primeng/calendar';
import { DepartmentScheduleService } from "./services/department-schedule.service";
import { DepartmentMeetingService } from "./services/department-meeting.service";
import { DepartmentMemberService } from "./services/department-member.service";
import { DepartmentMemberOutletComponent } from "./pages/department-member/department-member-outlet/department-member-outlet.component";
import { DepartmentMemberIndexComponent } from "./pages/department-member/department-member-index/department-member-index.component";
import { DepartmentMemberAddComponent } from "./pages/department-member/department-member-add/department-member-add.component";
import { DepartmentMemberEditComponent } from "./pages/department-member/department-member-edit/department-member-edit.component";
import { DepartmentLessonOutletComponent } from "./pages/department-lesson/department-lesson-outlet/department-lesson-outlet.component";
import { DepartmentLessonIndexComponent } from "./pages/department-lesson/department-lesson-index/department-lesson-index.component";
import { DepartmentLessonAddComponent } from "./pages/department-lesson/department-lesson-add/department-member-add.component";
import { DepartmentLessonEditComponent } from "./pages/department-lesson/department-lesson-edit/department-lesson-edit.component";
import { DepartmentLessonService } from "./services/department-lesson.service";
import { DepartmentMeetingMemberService } from "./services/department-meeting-member.service";
import { ProceedingsDepartmentService } from "./services/proceedings-department.service";
import { DepartmentScheduleOutletComponent } from "./pages/department-schedule/department-schedule-outlet/department-schedule-outlet.component";
import { DepartmentScheduleIndexComponent } from "./pages/department-schedule/department-schedule-index/department-schedule-index.component";
import { DepartmentScheduleAddComponent } from "./pages/department-schedule/department-schedule-add/department-schedule-add.component";
import { DepartmentScheduleEditComponent } from "./pages/department-schedule/department-schedule-edit/department-schedule-edit.component";
import { SessionApprovalsService } from './services/session-approvals.service';
import { SessionApprovalsOutletComponent } from './pages/session-approvals/session-approvals-outlet/session-approvals-outlet.component';
import { SessionApprovalsIndexComponent } from './pages/session-approvals/session-approvals-index/session-approvals-index.component';
import { SessionApprovalsAddComponent } from './pages/session-approvals/session-approvals-add/session-approvals-add.component';
import { SessionApprovalsEditComponent } from './pages/session-approvals/session-approvals-edit/session-approvals-edit.component';
import { EvaluationGroupAddComponent } from './pages/evaluation-group/evaluation-group-add/evaluation-group-add.component';
import { EvaluationGroupEditComponent } from './pages/evaluation-group/evaluation-group-edit/evaluation-group-edit.component';
import { EvaluationGroupIndexComponent } from './pages/evaluation-group/evaluation-group-index/evaluation-group-index.component';
import { EvaluationGroupService } from './services/evaluation-group.service';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DepartmentRoutingModule,
    CalendarModule
  ],
  declarations: [

    DepartmentActivityOutletComponent,
    DepartmentActivityIndexComponent,
    DepartmentActivityAddComponent,
    DepartmentActivityEditComponent,

    DepartmentActivityTypeOutletComponent,
    DepartmentActivityTypeIndexComponent,
    DepartmentActivityTypeAddComponent,
    DepartmentActivityTypeEditComponent,

    DepartmentOutletComponent,
    DepartmentIndexComponent,
    DepartmentAddComponent,
    DepartmentEditComponent,

    DepartmentMeetingOutletComponent,
    DepartmentMeetingIndexComponent,
    DepartmentMeetingAddComponent,
    DepartmentMeetingEditComponent,

    DepartmentMeetingMemberOutletComponent,
    DepartmentMeetingMemberIndexComponent,
    DepartmentMeetingMemberAddComponent,
    DepartmentMeetingMemberEditComponent,

    ProceedingsDepartmentOutletComponent,
    ProceedingsDepartmentIndexComponent,
    ProceedingsDepartmentAddComponent,
    ProceedingsDepartmentEditComponent,

    DepartmentMeetingAttendeesOutletComponent,
    DepartmentMeetingAttendeesIndexComponent,
    DepartmentMeetingAttendeesAddComponent,
    DepartmentMeetingAttendeesEditComponent,

    DepartmentLessonOutletComponent,
    DepartmentLessonIndexComponent,
    DepartmentLessonAddComponent,
    DepartmentLessonEditComponent,

    DepartmentMemberOutletComponent,
    DepartmentMemberIndexComponent,
    DepartmentMemberAddComponent,
    DepartmentMemberEditComponent,


    DepartmentScheduleOutletComponent,
    DepartmentScheduleIndexComponent,
    DepartmentScheduleAddComponent,
    DepartmentScheduleEditComponent,

    SessionApprovalsOutletComponent,
    SessionApprovalsIndexComponent,
    SessionApprovalsEditComponent,
    SessionApprovalsAddComponent,

    EvaluationGroupIndexComponent,
    EvaluationGroupAddComponent,
    EvaluationGroupEditComponent

  ],
  providers: [
     DepartmentActivityService,
     DepartmentActivityTypeService,
     DepartmentService,
     DepartmentScheduleService,
     DepartmentMeetingService,
     DepartmentMemberService,
     DepartmentLessonService,
     DepartmentMeetingMemberService,
     DepartmentScheduleService,
     ProceedingsDepartmentService,
     DepartmentMeetingAttendeesService,
     SessionApprovalsService,
     EvaluationGroupService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class DepartmentModule { }
