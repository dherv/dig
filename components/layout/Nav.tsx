import { BrandTitle } from "@/layout/BrandTitle";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import useSWR from "swr";
import { MediaType } from "../../services/tmdb/types";
import { Autocomplete } from "../features/search/Autocomplete";
import ActiveLink from "./ActiveLink";
import { AvatarMenu } from "./AvatarMenu";

export const Nav: FC = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const user = useUser();

  const { data, error: errorProfile } = useSWR(
    user?.id ? `/api/profile/${user?.id}` : null
  );

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

  const handleMouseOver = () => {
    console.log("over");
  };
  return (
    <>
      <nav className="relative flex justify-between items-center p-3 h-16">
        <div className="flex items-center">
          <BrandTitle />
          <div className="flex ml-6">
            <div className="ml-2">
              <ActiveLink
                href="/"
                activeClassName="after:h-[2px] after:block after:w-[50px] after:bg-white after:mt-[4px]"
                className="block font-thin text-sm text-gray-100 capitalize cursor-pointer"
              >
                {/* <StarIcon className="w-5 h-5" /> */}
                <span className="hidden md:inline ">suggestions</span>
              </ActiveLink>
            </div>
            <div className="ml-2">
              <ActiveLink
                href="/movies"
                activeClassName="after:h-[2px] after:block after:w-[50px] after:bg-white after:mt-[4px]"
                className="block font-thin text-sm text-gray-100 capitalize cursor-pointer"
              >
                {/* <a className="flex font-thin text-sm text-gray-100 capitalize"> */}
                {/* <FilmIcon className="w-5 h-5" /> */}
                <span className="hidden md:inline ">New & Popular</span>
                {/* </a> */}
              </ActiveLink>
            </div>
          </div>
        </div>

        <div className="w-96 ml-auto mr-4 md:ml-0 md:mr-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          <Autocomplete onSelect={handleSelect} resultCount={20} />
        </div>

        <AvatarMenu data={data} />

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
      </nav>
    </>
  );
};
