import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { FC, useEffect, useState } from "react";
// import { Avatar } from "./Avatar";
import { Avatar, User as UserUI } from "@nextui-org/react";
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

  const [avatarUrl, setAvatarUrl] = useState<string>();

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
      ErrorService.catchError(error);
    }
  }

  useEffect(() => {
    if (src) downloadImage(src);
  }, [src]);

  return avatarType === "avatar" ? (
    <Avatar
      src={avatarUrl}
      text={username?.substring(0, 2)}
      className={`${props.className} z-0`}
      size={size}
    />
  ) : (
    <UserUI src={avatarUrl} name={username} size={size} className="[&>*]:z-0" />
  );
};
