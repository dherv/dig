import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { BrandTitle } from "../base/BrandTitle";
import { Search } from "../base/Search";

export const Nav: FC = () => {
  const { cache } = useSWRConfig();

  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [username, setUsername] = useState<string>();
  const router = useRouter();

  const { user, error: errorUser } = useUser();
  const { data, error: errorProfile } = useSWR(
    user?.id ? `/api/profile/${user?.id}` : null
  );

  // TODO: find a better way to get avatar in Layout Nav on first load: localStorage / store / swr cache
  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabaseClient.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      if (data) {
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      }
    } catch (error) {
      // TODO: error handling here: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
      // @ts-ignore
      console.log("Error downloading image: ", error.message);
    }
  }

  // TODO: find a way to handle logout differently. redirect not working properly with helpers
  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    cache.clear();
    router.push("/login");
  };

  useEffect(() => {
    console.log({ data });
    if (data && data.avatar_url) downloadImage(data.avatar_url);
    if (data && data.username) setUsername(data.username);
  }, [data]);

  const handleSearchMovie = (query: string) => {
    console.log({ query });
  };

  useEffect(() => {
    console.log({ user });
    const session = supabaseClient.auth.session();
    console.log({ session });
    if (!session?.user) {
      console.log(session?.expires_in);
      supabaseClient.auth.refreshSession();
    }
  }, [user]);

  return (
    <nav className="flex justify-between items-center">
      <div className="flex items-center">
        <BrandTitle />
        <div className="ml-6">
          <Link href="/">
            <a className="font-light text-sm text-gray-600">home</a>
          </Link>
        </div>
        <div className="ml-6">
          <Link href="/movies">
            <a className="font-light text-sm text-gray-600">movies</a>
          </Link>
        </div>
        <div className="ml-6">
          <Link href="/profile">
            <a className="font-light text-sm text-gray-600">profile</a>
          </Link>
        </div>
      </div>
      <Search />
      <div className="flex">
        <p>{username}</p>
        {avatarUrl ? (
          <Image alt="personal avatar" src={avatarUrl} width={30} height={30} />
        ) : (
          <></>
        )}
        <button onClick={handleSignOut}>sign out</button>
      </div>
    </nav>
  );
};
