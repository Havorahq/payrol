"use client";

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Wrapper from "../components/wrapper/Wrapper";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Preloader from "../components/common/Preloader";

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  public_address: string;
  user_type: string;
}

const mockUserData: UserData = {
  email: "user@example.com",
  first_name: "John",
  last_name: "Doe",
  public_address: "0x1234567890abcdef",
  user_type: "business", // or "employee"
};

const Profile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(mockUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return <div>Error: {error.message}</div>;
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

  const { email, first_name, last_name, public_address, user_type } = userData;

  const isEmployer = user_type === "business";
  const isEmployee = user_type === "employee";

  return (
    <>
      <Wrapper>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="p-6">
            <h1 className="text-xl font-bold">Update Profile Details</h1>
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
            <div className="my-2">
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
        <div className="px-14">
          <div className="flex items-center justify-between p-8 px-16 bg-white rounded-md shadow mb-4 text-gray-700">
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
          <div className="p-16 bg-white rounded-md shadow border text-gray-700">
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
                <p className="text-sm font-semibold text-brandgray">First Name</p>
                <p className="text-xl font-semibold">
                  {first_name} {last_name}
                </p>
              </div>
            )}
            {isEmployer && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">Business Email</p>
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
              <p className="text-sm font-semibold text-brandgray">Account Type</p>
              <p className="text-xl font-semibold">{user_type}</p>
            </div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-brandgray">Public Address</p>
              <p className="text-xl font-semibold">{public_address}</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;
