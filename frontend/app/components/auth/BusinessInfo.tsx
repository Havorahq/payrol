import React, { ChangeEvent } from "react";
import Button from "../common/Button";

interface BusinessInfoProps {
  // route: string;
  //   email: string;
  //   firstName: string;
  //   lastName: string;
  businessName: string;
  businessEmail: string;
  businessSize: number;
  industry: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  // activeTab: string;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({
  businessName,
  businessEmail,
  businessSize,
  industry,
  onChange,
  onSelectChange,
  setStep,
}) => {
  return (
    <div className="my-4 w-full">
      <p className="text-gray-400">Business Information</p>
      <div className="my-4">
        <label htmlFor="businessName">Business Name</label>
        <input
          type="text"
          name="businessName"
          id="businessName"
          value={businessName}
          placeholder="Enter your company name"
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
          placeholder="Enter your company email"
          onChange={onChange}
          className="input"
          required
        />
      </div>
      <div className="my-4">
        <label htmlFor="businessSize">Business Size</label>
        {/* <input
          type="email"
          name="businessEmail"
          id="businessEmail"
          value={businessEmail}
          placeholder="Enter your business email"
          onChange={onChange}
          className="input"
          required
        /> */}
        <select
          name="businessSize"
          id="businessSize"
          value={businessSize}
          className="input"
          onChange={onSelectChange}
        >
          <option value={0}>Select Size</option>
          <option value={10}>0 - 10</option>
          <option value={100}>10 - 100</option>
        </select>
      </div>
      <div className="my-4">
        <label htmlFor="industry">Industry</label>
        <input
          type="email"
          name="industry"
          id="industry"
          value={industry}
          placeholder="Finance"
          onChange={onChange}
          className="input"
          required
        />
      </div>
      <div className="flex justify-center">
        <Button primary onClick={() => setStep(2)} disabled={!businessName || !businessEmail || !industry}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BusinessInfo;
