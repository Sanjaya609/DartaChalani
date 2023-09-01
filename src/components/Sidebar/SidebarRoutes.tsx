// import { adminManagementPath } from '@/routes/admin-management';
import { AiOutlineDashboard, AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
// import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoDesktopOutline } from "react-icons/io5";
import { RiEqualizerLine } from "react-icons/ri";
import { privateRoutePath } from "../../routes/private/privateRoutePath";
import { useAuth } from "../../providers/ApplicationProvider";
import { ChildrenModuleList, ModuleList } from "../../core/private/Private.schema";
import i18next from "i18next";

export interface SidebarElementConfig {
  path?: string;
  title: string;
  icon?: React.ReactElement;
  children?: SidebarElementConfig[];
  key: string;
}

export const SidebarRoutes: SidebarElementConfig[] = [
  {
    title: "dashboard",
    key: "dashboard",
    path: "/",
    icon: <AiOutlineDashboard />,
  },

  // {
  //   title: 'Admin',
  //   key: 'admin',
  //   privilege: {
  //     screen: PRIVILEGESCREEN.ADMIN,
  //     module: '',
  //     privilege: ''
  //   },
  //   children: [
  //     {
  //       title: 'Specific Item',
  //       path: adminManagementPath.specificItemList,
  //       key: 'specific-item',
  //       privilege: {
  //         screen: PRIVILEGESCREEN.ADMIN,
  //         module: PRIVILEGEMODULE.ADMIN_SPECIFIC_ITEM,
  //         privilege: ''
  //       }
  //     }
  //   ]
  // },
  {
    title: "userManagement",
    key: "User",
    icon: <AiOutlineUserAdd />,
    children: [
      {
        title: "userSetup",
        key: "user-setup",
        path: privateRoutePath.userSetup,
      },
      {
        title: "roleSetup",
        key: "role-setup",
        path: privateRoutePath.roleSetup,
      },
      {
        title: "moduleSetup",
        key: "module-setup",
        path: privateRoutePath.moduelSetup,
      },
      {
        title: "resourceSetup",
        key: "resource-setup",
        path: privateRoutePath.resourceSetup,
      },
    ],
  },
  {
    title: "masterConfiguration",
    key: "masterConfiguration",
    icon: <RiEqualizerLine />,
    children: [
      {
        title: "sectorSetup",
        key: "sector-setup",
        path: privateRoutePath.sectorSetup,
      },
      {
        title: "subSectorSetup",
        key: "sub-sector-setup",
        path: privateRoutePath.subSectorSetup,
      },
      {
        title: "climateChangeIndicatorSetup",
        key: "climate-setup",
        path: privateRoutePath.climateSetup,
      },
      {
        title: "genderSesitiveIndicatorSetup",
        key: "gender-sensitive-setup",
        path: privateRoutePath.genderSensitiveSetup,
      },
      {
        title: "startegyPedestalIndicatorSetup",
        key: "strategy-pedestal-setup",
        path: privateRoutePath.strategyPedestalSetup,
      },
      {
        title: "sustainableDevelopmentGoalSetup",
        key: "sustainable-setup",
        path: privateRoutePath.sustainableDevelopmentGoalSetup,
      },
      {
        title: "priorityGradeSetup.title",
        key: "priority-grade-setup",
        path: privateRoutePath.priorityGrade,
      },
      {
        title: "priorityOptionSetup.title",
        key: "priority-option-setup",
        path: privateRoutePath.priorityOption,
      },
      {
        title: "Sectoral Expense Source Ceiling",
        key: "sectoral-expense-source-ceiling",
        path: privateRoutePath.sectoralExpenseSourceCeiling,
      },
      {
        title: "fiscalYearSetup",
        key: "fiscal-year-setup",
        path: privateRoutePath.fiscalYearSetup,
      },
      {
        title: "sectoralReportTemplateSetup",
        key: "sectoral-report-setup",
        path: privateRoutePath.sectoralReportTemplate,
      },
      {
        title: "programSetup",
        key: "program-setup",
        path: privateRoutePath.programSetup,
      },
      {
        title: "sectoralAimAndResultIndicatorSetup",
        key: "sectoralAimAndResultIndicatorSetup",
        path: privateRoutePath.sectoralAimAndResultIndicatorSetup,
      },
    ],
  },
  {
    title: "sectoralReport",
    key: "sectoralReport",
    icon: <BsBoxSeam />,
    path: privateRoutePath.sectoralReportForm,
  },
  // {
  //   title: "Stock Configuration",
  //   key: "stocks",
  //   icon: <BsBoxSeam />,
  // },

  // {
  //   title: "Requisition Management",
  //   key: "requisitionManagement",
  //   icon: <HiOutlineViewGridAdd />,
  // },
  // {
  //   title: "Asset Management",
  //   key: "assetManagement",
  //   icon: <IoDesktopOutline />,
  // },
];


export const useSidebarRouteList = (moduleList: ModuleList[]): SidebarElementConfig[] => {
  const returnIconElement = (iconName: string): JSX.Element => {
    switch (iconName) {
      case 'AiOutlineDashboard':
        return <AiOutlineDashboard />
      case 'AiOutlineUserAdd':
        return <AiOutlineUserAdd />
      case 'RiEqualizerLine':
        return <RiEqualizerLine />
      case 'IoDesktopOutline':
        return <IoDesktopOutline />
      case "AiOutlineHome":
        return <AiOutlineHome />
      default:
        return <></>
    }
  }
  const convertElemntToConfigFormat = (el: ChildrenModuleList): SidebarElementConfig => ({
    path: el.url,
    title: i18next.language === 'en' ? el.moduleNameEnglish : el.moduleNameNepali,
    key: el.moduleNameCode
  })
  if (moduleList) {
    const sidebarItems: SidebarElementConfig[] = moduleList.map(el => (
      {
        path: el.url,
        title: i18next.language === 'en' ? el.moduleNameEnglish : el.moduleNameNepali,
        icon: returnIconElement(el.icon),
        children: el.childrenModuleList ? el?.childrenModuleList?.map(el => convertElemntToConfigFormat(el)) : undefined,
        key: el.moduleNameCode,
      }
    ))
    return sidebarItems;
  }
  return []
}