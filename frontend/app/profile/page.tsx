"use client";

import React, { useCallback, useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Wrapper from "../components/wrapper/Wrapper";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Preloader from "../components/common/Preloader";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { findUser } from "../api/helper-functions";
import { capitalizeFirst } from "@/plugins/utils";
import { useUserData } from "../hooks/useUserData";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  userType: string;
}

const Profile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { userData, isLoading, error } = useUserData();

  // console.log("USERS: ", userData);

  // if (!userData) {
  //   return (
  //     <div className="flex h-full w-full justify-center items-center font-bricolage font-bold text-2xl">
  //       Please log in to view your profile.
  //     </div>
  //   );
  // }

  if (!userData) {
    return (
      <Wrapper>
        <div className="w-full h-full flex items-center justify-center">
          <Preloader height={80} />
        </div>
      </Wrapper>
    );
  }

  if (error) {
    return <div>Error: {userData.error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleUpdateProfile = () => {};

  const { email, firstName, lastName, address, userType } = userData?.data
    ?.data as unknown as UserData;

  // console.log("TT", email);

  const isEmployer = userType === "business";
  const isEmployee = userType === "employee";

  // const fetchUserData = useCallback(async () => {
  //   if (!userEmail) return;
  //   try {
  //     const userData = await findUser(userEmail);

  //     const userType = userData?.data?.data;
  //     setAccountType(userType);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // }, [userEmail]);

  // useEffect(() => {
  //   fetchUserData();
  // }, [fetchUserData]);

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
                placeholder={firstName}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="my-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder={lastName}
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
          {userData?.data?.data ? (
            <div className="lg:p-16 p-8 bg-white rounded-md shadow border text-gray-700">
              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">Name</p>
                <p className="text-xl font-semibold">
                  {firstName} {lastName}
                </p>
              </div>

              {/* {isEmployer && (
                <div className="mb-8">
                  <p className="text-sm font-semibold text-brandgray">
                    First Name
                  </p>
                  <p className="text-xl font-semibold">
                    {first_name} {last_name}
                  </p>
                </div>
              )} */}
              {isEmployer && (
                <div className="mb-8">
                  <p className="text-sm font-semibold text-brandgray">
                    Business Email
                  </p>
                  <p className="text-xl font-semibold">{email}</p>
                </div>
              )}

              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">Email</p>
                <p className="text-xl font-semibold">{email}</p>
              </div>

              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">
                  Account Type
                </p>
                <p className="text-xl font-semibold">
                  {capitalizeFirst(userType)}
                </p>
              </div>
              <div className="mb-8">
                <p className="text-sm font-semibold text-brandgray">Address</p>
                <p className="text-xl font-semibold">{address}</p>
              </div>
            </div>
          ) : (
            <div className="block">
              <Preloader />
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;
