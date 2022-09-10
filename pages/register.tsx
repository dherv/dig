import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState();
  const router = useRouter();
  const [userData, setUserData] = useState<{
    password: string;
    username: string;
  }>({ password: "", username: "" });

  useEffect(() => {
    console.log({ user });
    if (user) {
      fetch(`/api/friendship/accepted`);
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { password, username } = userData;
    if (password && username && user) {
      console.log({ password, username, user });
      const { data: passwordData, error: passwordError } =
        await supabaseClient.auth.update({
          password: password,
        });

      const { data, error } = await supabaseClient
        .from("profiles")
        .upsert({ id: user.id, username });

      if (!error && !passwordError) {
        router.push("/");
      }
      console.log({ data, passwordData, error, passwordError });
    }
  };
  return (
    <>
      {error && <p>{error.message}</p>}
      <form>
        <label>update password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        ></input>

        <label>update username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        ></input>

        <button onClick={handleUpdatePassword}>update</button>
      </form>
      {/* <Auth
        supabaseClient={supabaseClient}
        view="update_password"
        redirectTo="/"
      /> */}
    </>
  );
};

export default RegisterPage;
