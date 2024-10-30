import React from "react";

export type ChatHeaderProps = {
  name?: string | undefined;
  receiverId?: string | undefined;
  chatId?: string | undefined;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChatHeader = ({ name }: ChatHeaderProps) => {
  return (
    <div className="fixed right-0 left-0 top-0 h-16 flex justify-center bg-background items-center shadow-md">
      <p className="font-bold">{name}</p>
    </div>
  );
};

export default ChatHeader;
