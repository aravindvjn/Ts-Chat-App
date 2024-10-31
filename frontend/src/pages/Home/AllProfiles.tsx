import { useEffect, useState } from "react";
import { chatURL } from "../../global/Links/Links";
import SingleProfile from "./SingleProfile";
import { io } from "socket.io-client"; // Import Socket.IO client

const socket = io(chatURL); // Connect to the Socket.IO server

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
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null; // Extract user ID from token

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
        const data: Chat[] = await response.json();
        setChatFriends(data);
        console.log(data);
      } catch (err) {
        console.error("Error in Fetching chat Profiles", err);
      }
    };

    fetchAllFriends();

    // Listen for 'user-chats-updated' event to receive real-time updates
    socket.on("user-chats-updated", (updatedChats: Chat[]) => {
      // Update the chatFriends state with new data
      setChatFriends(updatedChats);
    });

    return () => {
      socket.off("user-chats-updated"); 
    };
  }, [token, userId]); 

  return (
    <div>
      {chatFriends.length > 0 &&
        chatFriends.map((chat, index) => {
          return <SingleProfile key={index} chat={chat} />;
        })}
    </div>
  );
};

export default AllProfiles;
