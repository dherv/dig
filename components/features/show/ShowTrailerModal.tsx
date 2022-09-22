import { Modal } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { Show } from "../../../services/tmdb/types";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
type Props = {
  data: Show | null;
  bindings: any;
  onClose: () => void;
};
export const ShowTrailerModal: FC<Props> = ({ bindings, onClose, data }) => {
  return (
    <Modal
      scroll
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="bg-black text-white rounded-none"
      fullScreen
      noPadding
      {...bindings}
    >
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};
