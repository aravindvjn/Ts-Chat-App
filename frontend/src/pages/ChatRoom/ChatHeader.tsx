import { ArrowBackIos } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

export type ChatHeaderProps = {
  name?: string | undefined;
  receiverId?: string | undefined;
  chatId?: string | undefined;
  user_id?: string | undefined;
  lastMessageRef?: React.RefObject<HTMLDivElement> | undefined;
};
const ChatHeader = ({ name, user_id }: ChatHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="fixed right-0 left-0 top-0 h-16 z-10 flex bg-background items-center shadow-md px-4 w-[400px] m-auto">
      <ArrowBackIos
        className="absolute cursor-pointer"
        onClick={() => navigate(-1)}
      />
      {name && (
        <p
          onClick={() => navigate("/profile-user/" + user_id)}
          className="font-bold cursor-pointer text-center w-full"
        >
          {name}
        </p>
      )}
    </div>
  );
};

export default ChatHeader;
