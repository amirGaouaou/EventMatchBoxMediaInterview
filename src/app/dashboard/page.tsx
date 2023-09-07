import { ProfileDropdown } from "../components/ProfileDropdown";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

import initDB from "@/lib/localdb";
import EventList from "../components/EventList";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  const db = await initDB();

  return (
    <div className="h-full w-full">
      <div className="navbar bg-slate-900">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">MatchBox Media</a>
        </div>
        <div className="flex-none">
          <ProfileDropdown
            name={session.user?.name}
            email={session.user?.email}
            avatar={session.user?.image}
          />
        </div>
      </div>

      <main className="w-full">
        <div className="flex py-10 bg-gray-950  justify-center">
          <section className="mt-5 flex flex-col w-2/4 items-center">
            <span className="text-8xl text-white font-bold mt-5 ">
              Welcome to <span className="text-primary">Admin Tools</span>
            </span>
            <div className="text-2xl text-gray-400 my-10">
              Start building virtual events quickly and easily! Below are some
              ressources to inspire you and a community to support you.
            </div>
            <div className="button-section flex flex-row space-x-10">
              <button className="btn btn-primary btn-wide">
                📝 Solution templates
              </button>
              <button className="btn btn-neutral btn-wide ">
                🔥 Matchbox kitchen
              </button>
            </div>
          </section>
        </div>
        <div className="flex flex-row justify-between px-20 py-10">
          <EventList events={db.data.events} userType={session.user.group} />
        </div>
      </main>
    </div>
  );
}
