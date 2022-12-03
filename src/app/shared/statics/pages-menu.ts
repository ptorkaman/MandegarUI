import { NbMenuItem } from "@nebular/theme";
import { PageLinks } from "./page-links";
import { PagesTitle } from "./pages-title";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: PagesTitle.StaffManagement,
    icon: "fa-users",
    home: true,
    children: [
      {
        title: PagesTitle.StaffInfo,
        icon: "fa-id-card",
        home: true,
        children: [
          {
            title: PagesTitle.StaffListManagement,
            link: `/${PageLinks.Panel}/${PageLinks.Staff}`,
            hidden: false,
          },
          {
            title: PagesTitle.AssignPosition,
            link: `/${PageLinks.Panel}/${PageLinks.Staff}/${PageLinks.AssignPosition}`,
            hidden: false,
          },
        ],
      },
    ],
  },
  {
    title: PagesTitle.DepartmentManagement,
    icon: "fa-building",
    home: true,
    children: [
      {
        title: PagesTitle.Department,
        link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.Department}`,
        hidden: false,
      },
      {
        title: PagesTitle.DepartmentLesson,
        link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.DepartmentLesson}`,
        hidden: false,
      },
      {
        title: PagesTitle.DepartmentSchedule,
        link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.DepartmentSchedule}`,
        hidden: false,
      },
      {
        title: PagesTitle.DepartmentMember,
        link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.DepartmentMember}`,
        hidden: false,
      },
      {
        title: PagesTitle.DepartmentActivityTitle,
        icon: "fa-id-card",
        home: true,
        children: [
          {
            title: PagesTitle.DepartmentActivity,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.DepartmentActivity}`,
            hidden: false,
          },
          {
            title: PagesTitle.DepartmentActivityType,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.DepartmentActivityType}`,
            hidden: false,
          },
        ],
      },
      {
        title: PagesTitle.Meeting,
        icon: "fa-users",
        home: true,
        children: [
          {
            title: PagesTitle.DepartmentMeeting,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.DepartmentMeeting}`,
            hidden: false,
          },
          {
            title: PagesTitle.DepartmentMeetingMember,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.DepartmentMeetingMember}`,
            hidden: false,
          },
          {
            title: PagesTitle.ProceedingsDepartment,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.ProceedingsDepartment}`,
            hidden: false,
          },
          {
            title: PagesTitle.DepartmentMeetingAttendees,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.DepartmentMeetingAttendees}`,
            hidden: false,
          },
          {
            title: PagesTitle.SessionApprovals,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.SessionApprovals}`,
            hidden: false,
          },
        ],
      },
      {
        title: PagesTitle.Evaluation,
        icon: "fa-star",
        home: true,
        children: [
          {
            title: PagesTitle.EvaluationGroup,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.EvaluationGroup}`,
            hidden: false,
          },
          {
            title: PagesTitle.EvaluationIndicator,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.EvaluationIndicator}`,
            hidden: false,
          },
          {
            title: PagesTitle.SecretaryEvaluation,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.SecretaryEvaluation}`,
            hidden: false,
          },
          {
            title: PagesTitle.EvaluationCourse,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.EvaluationCourse}`,
            hidden: false,
          },
          {
            title: PagesTitle.Score,
            link: `/${PageLinks.Panel}/${PageLinks.Department}/${PageLinks.Score}`,
            hidden: false,
          },
        ],
      },
    ],
  },
  {
    title: PagesTitle.Account,
    icon: "fa-user",
    home: true,
    children: [
      {
        title: PagesTitle.Users,
        link: `/${PageLinks.Panel}/${PageLinks.Account}/${PageLinks.User}`,
        hidden: false,
      },
      {
        title: PagesTitle.Roles,
        link: `/${PageLinks.Panel}/${PageLinks.Account}/${PageLinks.Role}`,
        hidden: false,
      },
    ],
  },
  {
    title: PagesTitle.BaseInfo,
    icon: "fa-users",
    home: true,
    children: [
      {
        title: PagesTitle.CourseStudy,
        icon: "fa-id-card",
        home: true,
        children: [
          {
            title: PagesTitle.AcademicYear,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.AcademicYear}`,
            hidden: false,
          },

          {
            title: PagesTitle.StudyDegree,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.StudyDegree}`,
            hidden: false,
          },
          {
            title: PagesTitle.StudyField,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.StudyField}`,
            hidden: false,
          },
          {
            title: PagesTitle.StudyGrade,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.StudyGrade}`,
            hidden: false,
          },
        ],
      },
      {
        title: PagesTitle.Courses,
        icon: "fa-id-card",
        home: true,
        children: [
          {
            title: PagesTitle.LessonType,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.LessonType}`,
            hidden: false,
          },
          {
            title: PagesTitle.Lesson,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.Lesson}`,
            hidden: false,
          },
          // {
          //   title: PagesTitle.Topic,
          //   link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.Topic}`,
          //   hidden: false
          // },
        ],
      },
      {
        title: PagesTitle.Event,
        icon: "fa-id-card",
        home: true,
        children: [
          {
            title: PagesTitle.ExecutiveCalendar,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.ExecutiveCalendar}`,
            hidden: false,
          },
          {
            title: PagesTitle.TaskGroup,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.TaskGroup}`,
            hidden: false,
          },
          {
            title: PagesTitle.Task,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.Task}`,
            hidden: false,
          },
          {
            title: PagesTitle.Position,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.Position}`,
            hidden: false,
          },
          {
            title: PagesTitle.AssignTask,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.AssignTask}`,
            hidden: false,
          },
          {
            title: PagesTitle.CooperationType,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.CooperationType}`,
            hidden: false,
          },
          {
            title: PagesTitle.ActivityCase,
            link: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.ActivityCase}`,
            hidden: false,
          },
        ],
      },
      {
        title: PagesTitle.StaffInfo,
        icon: "fa-id-card",
        home: true,
        children: [
          {
            title: PagesTitle.StaffListManagement,
            link: `/${PageLinks.Panel}/${PageLinks.Staff}`,
            hidden: false,
          },
          {
            title: PagesTitle.AssignPosition,
            link: `/${PageLinks.Panel}/${PageLinks.Staff}/${PageLinks.AssignPosition}`,
            hidden: false,
          },
        ],
      },
    ],
  },
];
