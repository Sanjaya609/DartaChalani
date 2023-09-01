import React from "react";
import { privateRoutePath } from "./privateRoutePath";

export interface RouteProperties {
  path?: string;
  element: React.ReactNode;
  children?: RouteProperties[];
}

const Private = React.lazy(() => import("../../core/private/Private"));
const PageNotFound = React.lazy(
  () => import("../../components/derived/NoDataFound")
);

const Dashboard = React.lazy(() => import("../../core/private/Dashboard/index"))
const Security = React.lazy(
  () => import("../../core/private/security/Security")
);
const ModuleSetup = React.lazy(
  () => import("../../core/private/security/module")
);
const ResourceSetup = React.lazy(
  () => import("../../core/private/security/resource")
);
const RoleModuleMappingSetup = React.lazy(
  () => import("../../core/private/security/roleModuleMapping")
);
const RoleSetup = React.lazy(
  () => import("../../core/private/security/role/Role")
);
const MasterData = React.lazy(
  () => import("../../core/private/master-data/MasterData")
);

const FiscalYearSetup = React.lazy(
  () => import("../../core/private/master-data/fiscal-year/Fiscalyear")
);

export const privateRoutes: RouteProperties[] = [
  {
    path: privateRoutePath.root,
    element: <Private />,
    children: [
      {
        path: privateRoutePath?.dashboard,
        element: <Dashboard />
      },
      {
        path: privateRoutePath.security,
        element: <Security />,
        children: [
          {
            path: privateRoutePath.roleSetup,
            element: <RoleSetup />,
          },
          {
            path: privateRoutePath.moduelSetup,
            element: <ModuleSetup />
          },
          {
            path: privateRoutePath.resourceSetup,
            element: <ResourceSetup />
          },
          {
            path: privateRoutePath.roleModuleMappingSetup,
            element: <RoleModuleMappingSetup />
          }
        ],
      },
      {
        path: privateRoutePath.masterData,
        element: <MasterData />,
        children: [
          {
            path: privateRoutePath.fiscalYearSetup,
            element: <FiscalYearSetup />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound title={"404"} />,
  },
];
