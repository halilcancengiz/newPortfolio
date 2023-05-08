import { Drawer } from "antd";
import React, { useState } from "react";
import { FaComments } from "../assets/icon";
import { Comment } from "./Comment";

export const CommentsContainer = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        onClick={showDrawer}
        className="fixed cursor-pointer bottom-2 left-[50%] translate-x-[-50%] bg-blue-400 h-10 w-32 rounded-full flex items-center justify-center "
      >
        <FaComments size={25} />
      </div>
      <Drawer title="YORUMLAR" placement="right" onClose={onClose} open={open}>
        <Comment />
      </Drawer>
    </>
  );
};
