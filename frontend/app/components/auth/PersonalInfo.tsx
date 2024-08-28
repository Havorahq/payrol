import React, { ChangeEvent } from 'react'
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Button from '../common/Button';

interface PersonalInfoProps {
  // route: string;
  email: string;
  firstName: string;
  lastName: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  // businessName: string;
  // businessEmail: string;
  activeTab: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  firstName,
  lastName,
  email,
  activeTab,
  onChange,
  setStep
}) => {

  const { user } = useDynamicContext();

  return (
    <div className="my-4 w-full">
      <p className="text-gray-400">Personal Information</p>
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
          className="input cursor-not-allowed"
          required
          disabled
        />
      </div>
      <div className="my-4">
        <label htmlFor="address">Wallet Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={user?.verifiedCredentials[0].address}
          placeholder="0x000000000000"
          className="input cursor-not-allowed"
          required
          disabled
        />
      </div>
      <div className="flex justify-center">
        <Button primary onClick={() => activeTab === "business"  ? setStep(1) : setStep(2)} disabled={!firstName || !lastName}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo