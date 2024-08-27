import React, { useContext } from "react";
import { OnboardingContext } from "../../contexts/OnboardingContext";
import Button from "../common/Button";
import { DynamicWidget } from "../../../lib/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const Onboard: React.FC = () => {
  const context = useContext(OnboardingContext);
  const { user } = useDynamicContext();

  if (!context) {
    return null; // Or handle the case where context is undefined
  }

  const { onChange, onRouteChange, state } = context;
  const { firstName, lastName, businessName, businessEmail, email, activeTab } = state;

  return (
    <div className="m-8 p-8 px-16 h-full flex flex-col justify-center overflow-y-scroll">
      <div className="flex flex-col items-start">
        <h1>Sign Up👋🏼</h1>
      </div>

      <div className="my-4 w-full">
        <div className="my-4">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            placeholder="Enter your first name"
            onChange={onChange}
            className="input"
            required
          />
        </div>
        <div className="my-4">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            placeholder="Enter your last name"
            onChange={onChange}
            className="input"
            required
          />
        </div>
        <div className="my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user?.verifiedCredentials[1].email}
            placeholder="Enter your email"
            onChange={onChange}
            className="input"
            required
            disabled
          />
        </div>
        {activeTab === "business" && (
          <>
            <div className="my-4">
              <label htmlFor="businessName">Business Name</label>
              <input
                type="text"
                name="businessName"
                id="businessName"
                value={businessName}
                placeholder="Enter your business name"
                onChange={onChange}
                className="input"
                required
              />
            </div>
            <div className="my-4">
              <label htmlFor="businessEmail">Business Email</label>
              <input
                type="email"
                name="businessEmail"
                id="businessEmail"
                value={businessEmail}
                placeholder="Enter your business email"
                onChange={onChange}
                className="input"
                required
              />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center">
        <Button primary onClick={() => onRouteChange("signin")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Onboard;
