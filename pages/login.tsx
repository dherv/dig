import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Input } from "../components/features/search/Input";
import { fetcher } from "../services/swr/fetcher";

const LoginPage = () => {
  const user = useUser();
  const [data, setData] = useState();
  const router = useRouter();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  // TODO: see if it can be handled with the Auth component. right now redirectTo is not working
  useEffect(() => {
    console.log({ user, router });
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetcher(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })
      .then(() => {
        console.log("should push");
        router.push("/");
      })
      .catch((error) => console.log({ error }));
  };

  console.log("user", user);
  if (!user)
    return (
      <>
        <div className="relative flex justify-center items-center h-screen p-4 mx-auto">
          <h1 className="absolute top-0 left-0 p-4 font-bold text-4xl">Dig!</h1>
          <form className="bg-slate-800 min-w-[300px] w-[600px] h-96 px-4 py-8  shadow-slate-900  rounded-lg">
            <h4 className="mb-6 text-2xl font-bold capitalize underline underline-offset-4">
              login
            </h4>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                placeholder="email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={form.password}
                placeholder="password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full mt-8 border border-slate-400 px-3 py-1 rounded-lg bg-teal-500"
            >
              login
            </button>
          </form>
        </div>
      </>
    );

  return null;
};

export default LoginPage;
