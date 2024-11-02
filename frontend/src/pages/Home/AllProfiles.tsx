import { useEffect, useState } from "react";
import { chatURL } from "../../global/Links/Links";
import SingleProfile from "./SingleProfile";
import Suggested from "../Search/Suggested";

interface Chat {
  chat_id: string;
  friend_id: string;
  friend_username: string;
  friend_name: string;
  friend_profile_pic: string;
  last_message: string | null;
  last_message_time: string | null;
  last_message_id: string | null;
  last_message_sender_id: string | null;
  last_message_is_read: boolean;
}

const AllProfiles: React.FC = () => {
  const [chatFriends, setChatFriends] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string | null>("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllFriends = async () => {
      try {
        const response = await fetch(chatURL + "user-all-chats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setChatFriends(data);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error("Error in Fetching chat Profiles", err);
      }
    };

    fetchAllFriends();
  }, [token]);

  return (
    <div>
      {chatFriends.length > 0 &&
        chatFriends.map((chat, index) => {
          return <SingleProfile key={index} chat={chat} />;
        })}
      {message === "Add New Friends." && (
        <div className="p-5">
          <p className="text-center font-bold">{message}</p>
          <Suggested />
        </div>
      )}
      {!message && chatFriends.length === 0 && (
        <div className="animate-pulse text-center pt-4">Loading..</div>
      )}
    </div>
  );
};

export default AllProfiles;
