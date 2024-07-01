// types.ts
export interface OnboardingContextType {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRouteChange: (route: string) => void;
  onReset: () => void;
  onTabChange: (tab: string) => void;
  state: {
    activeTab: string;
    firstName: string;
    lastName: string;
    businessName: string;
    businessEmail: string;
    email: string;
  };
}
