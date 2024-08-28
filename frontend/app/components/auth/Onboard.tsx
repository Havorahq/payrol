import React, { useContext, useState } from "react";
import { OnboardingContext } from "../../contexts/OnboardingContext";
import Button from "../common/Button";
import { DynamicWidget } from "../../../lib/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import PersonalInfo from "./PersonalInfo";
import BusinessInfo from "./BusinessInfo";
import Review from "./Review";

const Onboard: React.FC = () => {
  const [step, setStep] = useState(0);
  const context = useContext(OnboardingContext);
  const { user } = useDynamicContext();

  if (!context) {
    return null; // Or handle the case where context is undefined
  }

  const { onChange, onSelectChange, onRouteChange, state } = context;
  const { firstName, lastName, businessName, businessEmail, businessSize, industry, email, activeTab } =
    state;


  const renderPages = () => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo
            firstName={firstName}
            lastName={lastName}
            email={email}
            activeTab={activeTab}
            onChange={onChange}
            setStep={setStep}
          />
        );
        break;
      case 1:
        return (
          <BusinessInfo
            businessName={businessName}
            businessEmail={businessEmail}
            businessSize={businessSize}
            industry={industry}
            onChange={onChange}
            onSelectChange={onSelectChange}
            setStep={setStep}
          />
        );
        break;
      case 2: 
        return (
          <Review
            firstName={firstName}
            lastName={lastName}
            email={email}
            businessName={businessName}
            businessEmail={businessEmail}
            businessSize={businessSize}
            industry={industry}
            activeTab={activeTab}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="lg:m-8 m-1 p-8 lg:px-16 px-0 h-full flex flex-col lg:justify-center justify-start overflow-y-scroll font-bricolage">
      <div className="flex flex-col items-start">
        <p className="font-semibold lg:text-4xl text-3xl">Sign Up👋🏼</p>
      </div>

      {renderPages()}

      {/* <div className="flex justify-center">
        <Button primary onClick={() => onRouteChange("signin")}>
          Sign Up
        </Button>
      </div> */}
    </div>
  );
};

export default Onboard;
