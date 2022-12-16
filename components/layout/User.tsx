import { Avatar, Stack } from "@mui/joy";
import { Typography } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FC, useEffect, useState } from "react";
import { ErrorService } from "../../services/error";

type Props = {
  src?: string;
  username?: string;
  size?: string;
  className?: string;
  avatarType: "user" | "avatar";
  onClick?: () => void;
};

export const User: FC<Props> = (props) => {
  const { src, username, avatarType, size } = props;
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  // TODO: find a better way to get avatar in Layout Nav on first load: localStorage / store / swr cache
  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
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
      ErrorService.catchError(error);
    }
  }

  useEffect(() => {
    if (src) downloadImage(src);
  }, [src]);

  return avatarType === "avatar" ? (
    <Avatar src={avatarUrl} alt={username} size="sm" />
  ) : (
    <Stack direction={"row"} alignItems="center" gap={2}>
      <Avatar src={avatarUrl} alt={username} size="sm" />
      <Typography>{username}</Typography>
    </Stack>
  );
};
