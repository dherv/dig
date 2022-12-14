import { BrandTitle } from "@/layout/BrandTitle";
import { FilmIcon, StarIcon } from "@heroicons/react/outline";
import Avatar from "@mui/joy/Avatar";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, MouseEvent, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { MediaType } from "../../services/tmdb/types";
import { Autocomplete } from "../features/search/Autocomplete";

export const Nav: FC = () => {
  const { cache } = useSWRConfig();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const user = useUser();

  const { data, error: errorProfile } = useSWR(
    user?.id ? `/api/profile/${user?.id}` : null
  );
  // TODO: find a way to handle logout differently. redirect not working properly with helpers
  const handleSignOut = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await supabaseClient.auth.signOut();
    cache.clear();
    router.push("/login");
  };

  // TODO: check how to properly set a refresh token in react app
  useEffect(() => {
    const session = supabaseClient.auth.getSession();
    if (!session) {
      supabaseClient.auth.refreshSession();
    }
  }, [supabaseClient.auth]);

  const handleSelect = (mediaType: MediaType, showId: number) => {
    router.push(`/shows/${showId}?mediaType=${mediaType}`);
  };
  return (
    <nav className="relative flex justify-between items-center p-3 h-16">
      <div className="flex items-center">
        <BrandTitle />
        <div className="ml-6">
          <Link href="/">
            <a className="flex font-light text-sm text-gray-600">
              <StarIcon className="w-5 h-5" />
              <span className="hidden md:inline md:ml-2">suggestions</span>
            </a>
          </Link>
        </div>
        <div className="ml-6">
          <Link href="/movies">
            <a className="flex font-light text-sm text-gray-600">
              <FilmIcon className="w-5 h-5" />
              <span className="hidden md:inline md:ml-2">browse</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="ml-auto mr-4 md:ml-0 md:mr-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
        <Autocomplete onSelect={handleSelect} resultCount={20} />
      </div>

      <div className="relative">
        <Avatar
          color="primary"
          variant="soft"
          alt={data?.username.toUpperCase()}
          src="/broken-image.jpg"
        ></Avatar>

        {/* <Popover>
          <Popover.Trigger>
            <button>
              <User
                src={data?.avatar_url}
                username={data?.username}
                avatarType="user"
              />
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <div className="bg-gray-50">
              <div className="px-3 py-2">
                <Link href="/profile">
                  <a className="block w-[150px] font-light text-sm text-gray-600">
                    profile
                  </a>
                </Link>
              </div>
              <div className="px-3 py-2 border-t">
                <a
                  className=" block w-[150px] font-light text-sm text-gray-600"
                  onClick={handleSignOut}
                >
                  <IconPower />
                </a>
              </div>
            </div>
          </Popover.Content>
        </Popover> */}
      </div>
    </nav>
  );
};
