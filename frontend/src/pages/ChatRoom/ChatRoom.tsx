import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import SingleChat from "./SingleChat";
import SendChat from "./SendChat";
import ChatHeader from "./ChatHeader";
import { chatURL } from "../../global/Links/Links";
import { UserContext, UserProps } from "../../global/Context/UserContext";
import { ChatMessage } from "./type";

const ChatRoom = () => {
  const { chat_id } = useParams();
  const userContext = useContext(UserContext)
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [otherUser, setOtherUser] = useState<UserProps>();
  const token = localStorage.getItem("token");
  const [refresh, setRefresh] = useState<boolean>(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const socket = io(chatURL, {
    transports: ["websocket"],
    withCredentials: true,
  });

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

    const fetchOtherUser = async () => {
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
        console.error("Error in Fetching user details", err);
      }
    };

    fetchChats();
    fetchOtherUser();

    socket.on("newMessage", (message) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return () => {
      socket.disconnect();
    };
  }, [chat_id, socket, refresh]);

  return (
    <div className="min-h-lvh">
      <ChatHeader name={otherUser?.name} />
      <div className="min-h-lvh py-16 pb-24">
        <div className="overflow-y-scroll">
          {chats.length > 0 &&
            chats.map((chat, index) => (
              <div key={index}>
                <SingleChat chat={chat} />
                {index === chats.length - 1 && <div ref={lastMessageRef}>{chat?.is_read && userContext?.user?.user_id === chat?.sender_id && <p className="text-[12px] w-full text-right pr-5 opacity-30">seen</p>}</div>}
              </div>
            ))}
        </div>
        <SendChat
          setRefresh={setRefresh}
          chatId={chat_id}
          receiverId={otherUser?.user_id}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
