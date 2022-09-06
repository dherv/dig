import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { BrandTitle } from "../base/BrandTitle";

export const Nav: FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [username, setUsername] = useState<string>();

  const { user, error: errorUser } = useUser();
  const { data, error: errorProfile } = useSWR(
    () => `/api/profile/${user?.id}`
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

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
  };

  useEffect(() => {
    if (data && data.avatar_url) downloadImage(data.avatar_url);
    if (data && data.username) setUsername(data.username);
  }, [data]);

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
