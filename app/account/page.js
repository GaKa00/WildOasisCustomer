import { getSession } from "next-auth/react";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Navigation",
};
 export default async function Page  () {
  const session = await auth()
  //  const session = await getSession();
  return (
    <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
     Welcome {session.user.name}!
      </h2>
    </div>
  )
}


