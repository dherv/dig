import ClickAwayListener from "@mui/base/ClickAwayListener";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Avatar, Link } from "@mui/joy";
import MenuItem from "@mui/joy/MenuItem";
import MenuList from "@mui/joy/MenuList";
import { styled } from "@mui/joy/styles";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import router from "next/router";
import { FC, KeyboardEvent, MouseEvent, useState } from "react";

import { useSWRConfig } from "swr";

const Popup = styled(PopperUnstyled)({
  zIndex: 1000,
});

// TODO: this is a temporary menu
export const AvatarMenu: FC<{ data: any }> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { cache } = useSWRConfig();
  const supabaseClient = useSupabaseClient();

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "Tab") {
      setAnchorEl(null);
    } else if (event.key === "Escape") {
      if (anchorEl) {
        anchorEl.focus();
        setAnchorEl(null);
      }
    }
  };

  // TODO: find a way to handle logout differently. redirect not working properly with helpers
  const handleSignOut = async (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    try {
      // await fetch("/api/auth/logout");
      await supabaseClient.auth.signOut();
      cache.clear();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Button
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        sx={{ borderRadius: 0 }}
      >
        Open menu
      </Button> */}
      <Avatar
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="neutral"
        variant="soft"
        size="sm"
        alt={data?.username?.toUpperCase()}
        src="/broken-image.jpg"
        onClick={handleClick}
      ></Avatar>
      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={anchorEl}
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList
            variant="outlined"
            onKeyDown={handleListKeyDown}
            sx={{ boxShadow: "md", bgcolor: "background.body" }}
          >
            <MenuItem onClick={handleClose}>
              <Link href="/profile">
                <a className="block w-[150px] font-light text-sm text-gray-600">
                  profile
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
              <PowerSettingsNewIcon />
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popup>
    </div>
  );
};
