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
    path: "/profile",
    title: "Profile",
  },
  {
    path: "/payslip",
    title: "Payslip",
  },
];

export default routes;
