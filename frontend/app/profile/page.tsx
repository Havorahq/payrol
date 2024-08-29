"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Wrapper from "../components/wrapper/Wrapper";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Preloader from "../components/common/Preloader";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { findUser } from "../api/helper-functions";
import { useUserData } from "../hooks/useUserData";

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  public_address: string;
  user_type: string;
}

const Profile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { userData, isLoading, error } = useUserData();

  if (!userData) {
    return <div>Please log in to view your profile.</div>;
  }

  if (error) {
    return <div>Error: {userData.error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return (
      <div className="w-full h-full">
        <Preloader height={80} />
      </div>
    );
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleUpdateProfile = () => {};

  const { email, first_name, last_name, public_address, user_type } =
    userData.data as unknown as UserData;

  const isEmployer = user_type === "business";
  const isEmployee = user_type === "employee";

  return (
    <>
      <Wrapper>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="p-6">
            <h1 className="text-xl font-bold text-left mb-8">
              Update Profile Details
            </h1>
            <div className="my-2">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder={first_name}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="my-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder={last_name}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="my-2 mb-8">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="text"
                placeholder={email}
                disabled
                className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100"
              />
            </div>
            <Button
              label="Save Changes"
              onClick={handleUpdateProfile}
              primary
            />
          </div>
        </Modal>
        <div className="lg:px-14 px-2">
          <div className="flex items-center justify-between p-8 lg:px-16 px-4 bg-white rounded-md shadow mb-4 text-gray-700">
            <div className="flex items-center gap-4">
              <div
                className="p-4 bg-gray-200 rounded-full cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                <FaArrowLeft size={24} />
              </div>
              {/* <p className="text-xl font-medium">Profile</p> */}
            </div>
            <Button
              label="Update Profile"
              onClick={openModal}
              style="w-fit"
              primary
            />
          </div>
          <div className="lg:p-16 p-8 bg-white rounded-md shadow border text-gray-700">
            {isEmployee && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">Name</p>
                <p className="text-xl font-semibold">
                  {first_name} {last_name}
                </p>
              </div>
            )}
            {isEmployer && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">
                  First Name
                </p>
                <p className="text-xl font-semibold">
                  {first_name} {last_name}
                </p>
              </div>
            )}
            {isEmployer && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">
                  Business Email
                </p>
                <p className="text-xl font-semibold">{email}</p>
              </div>
            )}
            {isEmployee && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">Email</p>
                <p className="text-xl font-semibold">{email}</p>
              </div>
            )}
            <div className="mb-8">
              <p className="text-sm font-semibold text-brandgray">
                Account Type
              </p>
              <p className="text-xl font-semibold">{user_type}</p>
            </div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-brandgray">
                Public Address
              </p>
              <p className="text-xl font-semibold">{public_address}</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;
