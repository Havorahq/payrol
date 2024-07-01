import React, { createContext, useState, ChangeEvent, ReactNode } from "react";
import Swal from "sweetalert2";

export interface ContractState {
  step: number;
  contractType: string;
  employeeName: string;
  employeeEmail: string;
  jobTitle: string;
  jobDescription: string;
  startDate: Date | null;
  endDate: Date | null;
  monthlyRate: string;
  milestoneTitles: string[];
  milestoneRates: string[];
  walletAddress: string;
  isPasswordShown: boolean;
  contractAddress?: string;
}

interface ContractContextProps {
  handleNext: () => void;
  handlePrev: () => void;
  comingSoon: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFromDateChange: (date: Date | null) => void;
  onToDateChange: (date: Date | null) => void;
  setState: React.Dispatch<React.SetStateAction<ContractState>>;
  state: ContractState;
}

export const ContractContext = createContext<ContractContextProps | undefined>(
  undefined
);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<ContractState>({
      step: 0,
      contractType: "",
      employeeName: "",
      employeeEmail: "",
      jobTitle: "",
      jobDescription: "",
      startDate: null,
      endDate: null,
      monthlyRate: "",
      milestoneTitles: [],
      milestoneRates: [],
      walletAddress: "",
      isPasswordShown: false,
    });

    const handleNext = () => {
      if (state.step < 5) {
        setState((prevState) => ({
          ...prevState,
          step: prevState.step + 1,
        }));
      }
    };

    const handlePrev = () => {
      setState((prevState) => ({
        ...prevState,
        step: prevState.step - 1,
      }));
    };

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const onFromDateChange = (date: Date | null) => {
      setState((prevState) => ({ ...prevState, startDate: date }));
    };

    const onToDateChange = (date: Date | null) => {
      setState((prevState) => ({ ...prevState, endDate: date }));
    };

    const comingSoon = () => {
      Swal.fire({
        title: "Coming soon",
        text: "This feature will be available soon",
        icon: "info",
      });
    };

    return (
      <ContractContext.Provider
        value={{
          handleNext,
          handlePrev,
          onChange,
          onFromDateChange,
          onToDateChange,
          comingSoon,
          setState,
          state,
        }}
      >
        {children}
      </ContractContext.Provider>
    );
};