import { Send } from "@mui/icons-material";
import React, { useState, useRef, FormEvent } from "react";
import { ChatHeaderProps } from "./ChatHeader";
import { chatURL } from "../../global/Links/Links";

const SendChat: React.FC<ChatHeaderProps> = ({
  receiverId,
  chatId,
  setRefresh,
}) => {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMessage(value);
    if (textareaRef.current) {
      if (textareaRef.current?.value.length < 30) {
        textareaRef.current.style.height = "45px";
      } else {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setMessage("");
      const response = await fetch(chatURL + "/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          receiver_id: receiverId,
          content: message,
          chat_id: chatId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Message sent successfully:");
        setRefresh?.((prev) => !prev);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      console.log("Failed to send message.");
    }
  };

  return (
    <div className="flex right-0 left-0 bottom-0 fixed h-fit p-3 pb-5 bg-background shadow-top items-end">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <textarea
          ref={textareaRef}
          className="w-full rounded-3xl p-2 pl-4 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:h-fit overflow-y-scroll"
          placeholder="Type a message"
          value={message}
          onChange={handleInputChange}
          style={{
            scrollbarWidth: "none",
            maxHeight: "100px",
            height: "45px",
          }}
        />
        <button className="ml-3">
          <Send />
        </button>
      </form>
    </div>
  );
};

export default SendChat;
