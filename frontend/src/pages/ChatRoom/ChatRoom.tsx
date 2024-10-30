import { useEffect, useState } from "react";
import SingleChat from "./SingleChat";
import { chatURL } from "../../global/Links/Links";
import { useParams } from "react-router-dom";
import SendChat from "./SendChat";
import ChatHeader from "./ChatHeader";
import { UserProps } from "../../global/Context/UserContext";

const ChatRoom = () => {
  const { chat_id } = useParams();
  const [chats, setChats] = useState([]);
  const [otherUser, setOtherUser] = useState<UserProps>();
  const token = localStorage.getItem("token");
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(chatURL + `last-30-messages/${chat_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setChats(data);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error("Error in Fetching chat Profiles", err);
      }
    };
    fetchChats();
    const fetchOtherUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(chatURL + `user-details/${chat_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setOtherUser(data);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error("Error in Fetching chat Profiles", err);
      }
    };
    fetchOtherUser();
  }, [refresh]);
  return (
    <div className="min-h-lvh">
      <ChatHeader name={otherUser?.name} />
      <div className="min-h-lvh py-16 pb-24">
        <div className="overflow-y-scroll">
          {chats?.length > 0 &&
            chats?.map((chat, index) => {
              return <SingleChat key={index} chat={chat} />;
            })}
        </div>
        <SendChat  setRefresh={setRefresh} chatId={chat_id} receiverId={otherUser?.user_id} />
      </div>
    </div>
  );
};

export default ChatRoom;
