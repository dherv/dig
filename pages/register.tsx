import LockIcon from "@mui/icons-material/Lock";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Button } from "@mui/joy";

import Stack from "@mui/joy/Stack";
import TextField from "@mui/joy/TextField";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
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
    <div className="relative flex justify-center items-center h-screen p-4 md:mx-auto">
      {/* <Card css={{ mw: "400px" }}>
      <Card.Body> */}
      <h1 className="absolute top-0 left-0 p-4 font-bold text-xl">Dig!</h1>
      {error && <p>{error.message}</p>}
      <form className="w-full max-w-[475px]">
        <h2 className="font-medium mb-4">
          Add your username and a password to proceed
        </h2>
        <Stack direction="column" spacing={2}>
          <TextField
            onChange={handleChange}
            label="username"
            name="username"
            value={userData.username}
            placeholder="Type in here…"
            startDecorator={<PersonRoundedIcon />}
            // endDecorator={
            //   <Chip size="sm" variant="soft">
            //     New stuff
            //   </Chip>
            // }
          />
          <TextField
            label="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="...password"
            startDecorator={<LockIcon />}
            // endDecorator={<CheckIcon />}
          />
          <Button variant="soft" onClick={handleUpdatePassword}>
            update
          </Button>
        </Stack>

        {/* <div className="w-full">
          <Input
            width="100%"
            required
            label="username"
            type="text"
            name="username"
            autoComplete="new-password"
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            width="100%"
            required
            autoComplete="new-password"
            label="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div> */}
        {/* <input
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
        ></input> */}
        {/* <button
          className="md:block w-48 ml-1 md:ml-0 md:b-2 px-10 py-3 my-8 text-sm font-medium text-white bg-pink-600 border border-pink-600 rounded active:text-pink-500 hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring"
          onClick={handleUpdatePassword}
        >
          update
        </button> */}
      </form>
    </div>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
});
export default RegisterPage;
