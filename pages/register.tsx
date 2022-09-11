import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

const RegisterPage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState();
  const router = useRouter();
  const [userData, setUserData] = useState<{
    password: string;
    username: string;
  }>({ password: "", username: "" });

  useEffect(() => {
    if (user) {
      fetch(`/api/friendship/accepted`);
    }
  }, [user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdatePassword = async (event: MouseEvent) => {
    event.preventDefault();
    const { password, username } = userData;
    if (password && username && user) {
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
    </>
  );
};

export default RegisterPage;
