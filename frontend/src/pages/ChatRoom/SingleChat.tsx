import classNames from "classnames";
import { useContext } from "react";
import { UserContext } from "../../global/Context/UserContext";

type Message = {
  chat_id?: string;
  content?: string;
  is_read?: boolean;
  message_id?: string;
  receiver_id?: string;
  sender_id?: string;
  sent_at?: string;
};

export type ChatsProps = {
  chat?: Message;
};
const SingleChat = ({ chat }: ChatsProps) => {
  const context = useContext(UserContext);
  const chatClasses = classNames(
    "text-black mt-3 w-fit rounded-[12px] px-3 py-2 text-[14px]",
    {
      "ml-4 pr-6 mr-16 rounded-tl-[0px]  bg-[#E5E7EB]": chat?.sender_id !== context?.user?.user_id,
      "mr-4 ml-16 rounded-tr-[0px] bg-[#BEE3F8]": chat?.sender_id === context?.user?.user_id,
    }
  );
  return (
    <div
      className={`flex ${
        chat?.sender_id === context?.user?.user_id ? "justify-end" : ""
      }`}
    >
      <div className={chatClasses}>
        <p>{chat?.content}</p>
      </div>
    </div>
  );
};

export default SingleChat;
