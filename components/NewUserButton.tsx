"use client";
import { insertUser } from "@/lib/db/queries";
import { NewUserType } from "@/lib/types";
// import { redirect } from "next/navigation";

const NewSiteButton = () => {
  const testUser: NewUserType = {
    name: "Test bruker Navnesen",
    email: "email@eksempel.com",
    phone: "+4593963633",
    // companyID: "Bjørgen Teknologi",
  };

  async function handleClick() {
    const name = insertUser(testUser);
    // redirect("/");
  }
  return (
    <button
      onClick={handleClick}
      className={`bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md`}
    >
      Add User
    </button>
  );
};

export default NewSiteButton;
