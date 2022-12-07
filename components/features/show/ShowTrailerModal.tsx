import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import dynamic from "next/dynamic";
import { FC } from "react";
import { Show } from "../../../services/tmdb/types";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
type Props = {
  data: Show | null;
  isOpen: boolean;
  onClose: () => void;
};
export const ShowTrailerModal: FC<Props> = ({ isOpen, onClose, data }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog
        aria-labelledby="layout-modal-title"
        aria-describedby="layout-modal-description"
        layout={"fullscreen"}
      >
        <ModalClose />
        <div className="w-full h-full flex justify-center items-center">
          <ReactPlayer
            playing={true}
            controls={true}
            // onClickPreview={() => console.log("click preview")}
            width={"100%"}
            height={"100%"}
            url={`https://www.youtube.com/watch?v=${data?.videos.results[0]?.key}`}
          />
        </div>
      </ModalDialog>
    </Modal>
  );
};
