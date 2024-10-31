import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

export type ChatHeaderProps = {
  name?: string | undefined;
  receiverId?: string | undefined;
  chatId?: string | undefined;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChatHeader = ({ name }: ChatHeaderProps) => {
  const navigate = useNavigate()
  return (
    <div className="fixed right-0 left-0 top-0 h-16 flex bg-background items-center shadow-md px-4">
      <ArrowBack className="absolute cursor-pointer" onClick={()=>navigate(-1)} />
      <p className="font-bold text-center w-full">{name}</p>
    </div>
  );
};

export default ChatHeader;
