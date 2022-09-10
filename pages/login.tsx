import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState();
  const router = useRouter();

  // TODO: see if it can be handled with the Auth component. right now redirectTo is not working
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user)
    return (
      <>
        {error && <p>{error.message}</p>}
        <Auth
          supabaseClient={supabaseClient}
          providers={["google", "github"]}
          socialLayout="vertical"
          socialButtonSize="xlarge"
        />
      </>
    );

  return null;
};

export default LoginPage;
