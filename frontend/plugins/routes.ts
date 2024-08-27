export interface Route {
  path: string;
  title: string;
}

const routes: Route[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
  },
  {
    path: "/create-contract",
    title: "Contract",
  },
  {
    path: "/team",
    title: "Team",
  },
  {
    path: "/profile",
    title: "Profile",
  },
  {
    path: "/payslip",
    title: "Payslip",
  },
];

export default routes;
