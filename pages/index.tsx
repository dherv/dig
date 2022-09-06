import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/ui";
import { useState } from "react";

const LoginPage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState();

  if (!user)
    return (
      <>
        {error && <p>{error.message}</p>}
        <Auth
          supabaseClient={supabaseClient}
          providers={["google", "github"]}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </>
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default LoginPage;
