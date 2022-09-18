import { Search } from "@/features/search/Search";
import { BrandTitle } from "@/layout/BrandTitle";
import { FilmIcon, StarIcon } from "@heroicons/react/outline";
import { Popover } from "@nextui-org/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { IconPower } from "@supabase/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, MouseEvent, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { User } from "./User";

export const Nav: FC = () => {
  const { cache } = useSWRConfig();
  const router = useRouter();

  const { user, error: errorUser } = useUser();

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

  useEffect(() => {
    const session = supabaseClient.auth.session();
    if (!session?.user) {
      supabaseClient.auth.refreshSession();
    }
  }, [user]);

  return (
    <nav className="relative flex justify-between items-center p-3 h-16">
      <div className="flex items-center">
        <BrandTitle />
        <div className="ml-6">
          <Link href="/">
            <a className="font-light text-sm text-gray-600">
              <span className="hidden md:block">suggestions</span>
              <span>
                <StarIcon className="w-5 h-5" />
              </span>
            </a>
          </Link>
        </div>
        <div className="ml-6">
          <Link href="/movies">
            <a className="font-light text-sm text-gray-600">
              <span className="hidden md:block">browse</span>
              <span>
                <FilmIcon className="w-5 h-5" />
              </span>
            </a>
          </Link>
        </div>
      </div>
      <Search />
      <div className="relative">
        <Popover>
          <Popover.Trigger>
            {/* library expect only one child: https://github.com/nextui-org/nextui/blob/main/packages/react/src/popover/popover-trigger.tsx */}
            <button>
              <User
                src={data?.avatar_url}
                username={data?.username}
                avatarType="user"
              />
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <div className="bg-gray-50 ">
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
        </Popover>
      </div>
    </nav>
  );
};
