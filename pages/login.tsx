import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const user = useUser();
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
      <div className="relative flex justify-center items-center h-screen p-4 mx-auto">
        {/* <Card css={{ mw: "400px" }}>
          <Card.Body> */}
        <h1 className="absolute top-0 left-0 p-4 font-bold text-xl">Dig!</h1>

        {/* <Auth supabaseClient={supabaseClient} view="sign_in" /> */}
        {/* </Card.Body>
        </Card> */}
      </div>
    );

  return null;
};

export default LoginPage;
