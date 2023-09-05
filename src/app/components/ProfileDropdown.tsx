"use client";
import { BiUserCircle } from "react-icons/bi";
import { FC } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface ProfileDropdownProps {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
}

export const ProfileDropdown: FC<ProfileDropdownProps> = ({
  name,
  email,
  avatar,
}) => {
  return (
    <div className="dropdown dropdown-end">
      <div className="justify-center items-center flex">
        <label className="text-center">
          <span className="text-lg ">{name}</span>
        </label>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-2">
          {avatar ? (
            <Image src={avatar} alt="profile-picture"></Image>
          ) : (
            <div className="w-20 p-2 rounded-full">
              <BiUserCircle size={35} />
            </div>
          )}
        </label>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <span className="mb-5 text-lg">Email : {email}</span>
        </li>
        <li>
          <a>Profile</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li onClick={() => signOut()}>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};
