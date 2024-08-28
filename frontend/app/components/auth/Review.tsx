import React from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Button from "../common/Button";
import { useRouter } from "next/navigation";

interface ReviewProps {
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessEmail: string;
  businessSize: number;
  industry: string;
  activeTab: string;
}

const Review: React.FC<ReviewProps> = ({
  firstName,
  lastName,
  email,
  businessName,
  businessEmail,
  businessSize,
  industry,
  activeTab,
}) => {
  const { user } = useDynamicContext();
  const router = useRouter();

  return (
    <div className="my-4 w-full lg:m-0 m-2">
      {/* <p className="text-2xl mb-4 font-semibold">Review</p> */}
      <p className="text-gray-400 text-sm mt-4">Personal Information</p>
      <div className="py-1 my-1 border-b">
        <p className="text-sm text-grey-500 font-medium">First Name</p>
        <p className="text-lg mt-1 text-grey">{firstName}</p>
      </div>
      <div className="py-1 my-1 border-b">
        <p className="text-sm text-grey-500 font-medium">Last Name</p>
        <p className="text-lg mt-1 text-grey">{lastName}</p>
      </div>
      <div className="py-1 my-1 border-b">
        <p className="text-sm text-grey-500 font-medium">Email</p>
        <p className="text-lg mt-1 text-grey">
          {user?.verifiedCredentials[1].email}
        </p>
      </div>
      <div className="py-1 my-1 border-b">
        <p className="text-sm text-grey-500 font-medium">Wallet Address</p>
        <p className="text-sm mt-1 text-grey">
          {user?.verifiedCredentials[0].address}
        </p>
      </div>
      {activeTab === "business" ? (
        <>
          <p className="text-gray-400 text-sm mt-8">Business Information</p>
          <div className="py-1 my-1 border-b">
            <p className="text-sm text-grey-500 font-medium">Business Name</p>
            <p className="text-lg mt-1 text-grey">{businessName}</p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-sm text-grey-500 font-medium">Business Email</p>
            <p className="text-lg mt-1 text-grey">{businessEmail}</p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-sm text-grey-500 font-medium">Business Size</p>
            <p className="text-lg mt-1 text-grey">{businessSize}</p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-sm text-grey-500 font-medium">Industry</p>
            <p className="text-lg mt-1 text-grey">{industry}</p>
          </div>
        </>
      ) : null}
      <div className="flex lg:flex-row flex-col justify-center lg:gap-8 gap-0">
        {/* <Button onClick={() => router.push("/dashboard")} style="md:m-0">
          Previous
        </Button> */}
        <Button primary onClick={() => router.push("/dashboard")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Review;
