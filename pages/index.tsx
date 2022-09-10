import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    const session = supabaseClient.auth.session();
    console.log({ session });
  });

  return (
    <>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
export default HomePage;
