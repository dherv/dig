// pages/profile.js
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";

export default function Profile({ user }: { user: User }) {
  return (
    <>
      <div>Hello {user.email}</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps = withPageAuth();
