import React, { createContext, useState, ChangeEvent, ReactNode } from "react";

interface OnboardingContextType {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRouteChange: (value: string) => void;
  onTabChange: (value: string) => void;
  onReset: () => void;
  state: StateType;
}

interface StateType {
  route: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessEmail: string;
  activeTab: string;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StateType>({
    route: "signin",
    email: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businessEmail: "",
    activeTab: "business",
  });

  const onRouteChange = (value: string) => {
    console.log("Route: ", state?.route)
    setState((prevState) => ({
      ...prevState,
      route: value,
    }));
  };

  const onTabChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      activeTab: value,
    }));
  };

  const onReset = () => {
    setState((prevState) => ({
      ...prevState,
      email: "",
      firstName: "",
      lastName: "",
      businessName: "",
      businessEmail: "",
    }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <OnboardingContext.Provider value={{ onChange, onRouteChange, onTabChange, onReset, state }}>
      {children}
    </OnboardingContext.Provider>
  );
};
