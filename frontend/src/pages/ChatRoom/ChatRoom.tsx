import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SingleChat from "./SingleChat";
import SendChat from "./SendChat";
import ChatHeader from "./ChatHeader";
import { chatURL } from "../../global/Links/Links";
import { UserContext, UserProps } from "../../global/Context/UserContext";
import { ChatMessage } from "./type";
import {
  connectSocket,
  disconnectSocket,
  emitEvent,
  listenToEvent,
  removeEventListener,
  socket,
} from "../../global/Socket/socketService";
const ChatRoom = () => {
  const { chat_id } = useParams();
  const userContext = useContext(UserContext);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [otherUser, setOtherUser] = useState<UserProps>();
  const token = localStorage.getItem("token");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  if (lastMessageRef.current) {
    lastMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  useEffect(() => {
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

    fetchOtherUser();
    while (!socket?.connect) {
      connectSocket();
    }
    emitEvent("fetch-messages" + userContext?.user?.user_id, chat_id);
    listenToEvent(
      "last-30-messages" + userContext?.user?.user_id,
      (message) => {
        setChats(message);
      }
    );
    listenToEvent("new-message" + userContext?.user?.user_id, (message) => {
      setChats((prevMessages) => [...prevMessages, message]);
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    });

    return () => {
      removeEventListener("last-30-messages" + userContext?.user?.user_id);
      removeEventListener("new-message" + userContext?.user?.user_id);
      disconnectSocket();
    };
  }, [chat_id]);

  return (
    <div className="min-h-lvh">
      <ChatHeader name={otherUser?.name} />
      <div className="min-h-lvh my-16 mb-24">
        <div className="overflow-y-scroll ">
          {chats.length > 0 &&
            chats.map((chat, index) => (
              <div key={index}>
                {index === 0 && chats.length >= 30 && (
                  <p className="text-center bg-gray-300">
                    Last {chats.length} messages
                  </p>
                )}
                <SingleChat chat={chat} />
                {index === chats.length - 1 && (
                  <div ref={lastMessageRef}>
                    {chat?.is_read &&
                      userContext?.user?.user_id === chat?.sender_id && (
                        <p className="text-[12px] w-full text-right pr-5 opacity-30">
                          seen
                        </p>
                      )}
                  </div>
                )}
              </div>
            ))}
          {chats === undefined && (
            <p className="flex justify-center items-center h-lvh">
              No Messages
            </p>
          )}
        </div>
        <SendChat
          user_id={userContext?.user?.user_id}
          lastMessageRef={lastMessageRef}
          chatId={chat_id}
          receiverId={otherUser?.user_id}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
