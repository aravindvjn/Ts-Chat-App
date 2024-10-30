import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { SingleProfileProps } from "./type";

const SingleProfile = ({ chat }: SingleProfileProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("chat-room/" + chat?.chat_id);
      }}
      className="bg-secondary text-black p-5 flex justify-between mt-1 border-b"
    >
      <div className="overflow-hidden px-2 w-1/2 relative text-[12px]">
        <p className="pb-1 font-semibold text-[14px]">{chat?.friend_name}</p>
        <p className="bottom-0 opacity-80">
          {chat?.last_message
            ? chat?.last_message.length > 30
              ? chat?.last_message.slice(0, 20) + "..."
              : chat?.last_message
            : "Take to send a message."}
        </p>
        <p className="opacity-50">{chat?.last_message_time}</p>
      </div>
      <Avatar src={chat?.friend_profile_pic} />
    </div>
  );
};

export default SingleProfile;
