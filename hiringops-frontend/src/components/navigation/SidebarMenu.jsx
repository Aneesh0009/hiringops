import { ROUTES } from "../../constants/routes";

export const sidebarMenus = {
  admin: [
    {
      label: "Dashboard",
      path: ROUTES.ADMIN_DASHBOARD,
    },
    {
      label: "Users",
      path: ROUTES.ADMIN_USERS,
    },
    {
      label: "Analytics",
      path: ROUTES.ADMIN_ANALYTICS,
    },
  ],

  recruiter: [
    {
      label: "Dashboard",
      path: ROUTES.RECRUITER_DASHBOARD,
    },
    {
      label: "Jobs",
      path: ROUTES.RECRUITER_JOBS,
    },
    {
      label: "Applicants",
      path: ROUTES.RECRUITER_APPLICANTS,
    },
    {
        label: "Create Job",
        path: ROUTES.RECRUITER_CREATE_JOB,
      },
  ],

  candidate: [
    {
      label: "Dashboard",
      path: ROUTES.CANDIDATE_DASHBOARD,
    },
    {
      label: "Applications",
      path: ROUTES.CANDIDATE_APPLICATIONS,
    },
    {
      label: "Profile",
      path: ROUTES.CANDIDATE_PROFILE,
    },
  ],
};