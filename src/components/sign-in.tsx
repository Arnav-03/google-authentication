"use client"
import { signIn, useSession,signOut as nextAuthSignOut } from "next-auth/react";
import { useEffect } from "react";
import { FormEvent } from "react";

export function SignIn() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Fetch additional user info or perform actions after sign-in
      console.log("User signed in:", session.user);
    }else{
        console.log("not logged in ")
    }
  }, [session, status]);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("google");
  };

  const handleSignOut = async () => {
    await nextAuthSignOut(); // Use the signOut function from next-auth/react
  };

  return (
    <>
      {status === "authenticated" && (
        <div>
          <p>Signed in as: {session?.user?.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

      {status !== "authenticated" && (
        <form onSubmit={handleSignIn}>
          <button type="submit">Sign in with Google</button>
        </form>
      )}
    </>
  );
}