// setup boilerplate for signin page
//

import { useState } from "react";
import Image from "next/image";
import Login from "@/app/components/Login";

export default function SignIn() {
  return (
    <div className="grid grid-cols-10 h-screen">
      <div className="col-span-3 h-screen flex justify-center ">
        <Login />
      </div>
      <div className="col-span-7 h-screen relative">
        <Image
          src="/team-mvm-work.jpg"
          alt="Sign In"
          fill
          objectFit="cover"

          // objectPosition="center"
        />
      </div>
    </div>
  );
}
