import { Avatar } from "@mui/joy";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { ErrorService } from "../../services/error";

type Props = {
  url: string;
  size: number;
  onUploadLoading: (status: boolean) => void;
  onUpload: (path: string) => void;
};
export const ProfileAvatar: FC<Props> = ({
  url,
  size,
  onUploadLoading,
  onUpload,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabaseClient.storage
        .from("avatars")
        .createSignedUrl(path, 60);

      if (error) {
        throw error;
      }
      if (data) {
        // const url = URL.createObjectURL(data);
        setAvatarUrl(data.signedURL);
      }
    } catch (error) {
      ErrorService.catchError(error);
    }
  }

  // TODO: add delete before
  // TODO: add cancel functionality
  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      onUploadLoading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabaseClient.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      ErrorService.catchError(error);
    } finally {
      setUploading(false);
      onUploadLoading(false);
    }
  }

  return (
    <div>
      <div style={{ width: size }}>
        <label className="hover:cursor-pointer" htmlFor="single">
          {/* <Avatar src={avatarUrl} text="?" css={{ size: "$40", zIndex: 0 }} /> */}
          <Avatar src={avatarUrl} size="lg"></Avatar>
          <input
            className="hover:cursor-pointer"
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
};
