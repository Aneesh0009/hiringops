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
    {
      label: "Applications",
      path: ROUTES.RECRUITER_APPLICATIONS,
    },
    {
      label: "Analytics",
      path: ROUTES.RECRUITER_ANALYTICS,
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
    {
      label: "Browse Jobs",
      path: ROUTES.CANDIDATE_BROWSE_JOBS,
    },
    {
      label: "Applications",
      path: ROUTES.CANDIDATE_APPLICATIONS,
    },
  ],
};
