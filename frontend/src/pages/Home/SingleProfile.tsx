import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { SingleProfileProps } from "./type";
import { chatURL } from "../../global/Links/Links";
import { useContext } from "react";
import { UserContext } from "../../global/Context/UserContext";

const SingleProfile = ({ chat }: SingleProfileProps) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const convertToIST = (utcDate: string): string => {
    if (!utcDate) {
      return "Invalid date";
    }

    const date = new Date(utcDate);

    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", utcDate);
      return "Invalid date";
    }

    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleString("en-IN", options);
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const response = await fetch(chatURL + `/set-message-read/${messageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.log("Something went wrong at Set Message as read.");
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  return (
    <div
      onClick={() => {
        navigate("chat-room/" + chat?.chat_id);
        if (
          chat?.last_message_id &&
          userContext?.user?.user_id !== chat?.last_message_sender_id
        ) {
          markMessageAsRead(chat.last_message_id);
        } else {
          console.log(
            "wrong",
            userContext?.user?.user_id,
            chat?.last_message_sender_id
          );
        }
      }}
      className={`bg-secondary text-black p-5 flex justify-between mt-1 border-b cursor-pointer ${
        userContext?.user?.user_id !== chat?.last_message_sender_id &&
        chat?.last_message_is_read === false
          ? "bg-green-100"
          : ""
      }`}
    >
      <div className="overflow-hidden px-2 w-1/2 relative text-[12px]">
        <p className="pb-1 font-semibold text-[14px]">{chat?.friend_name}</p>
        <p
          className={`bottom-0 opacity-80 ${
            userContext?.user?.user_id !== chat?.last_message_sender_id &&
            chat?.last_message_is_read === false
              ? "font-bold"
              : ""
          }`}
        >
          {chat?.last_message
            ? chat?.last_message.length > 30
              ? chat?.last_message.slice(0, 20) + "..."
              : chat?.last_message
            : "Take to send a message."}
        </p>
        <p className="opacity-50">
          {chat?.last_message_time ? convertToIST(chat.last_message_time) : ""}
        </p>
      </div>
      <Avatar src={chat?.friend_profile_pic} />
    </div>
  );
};

export default SingleProfile;
