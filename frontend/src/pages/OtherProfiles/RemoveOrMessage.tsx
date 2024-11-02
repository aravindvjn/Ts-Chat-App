import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import { IdProps } from "./Operations";
import { chatURL, friendURL } from "../../global/Links/Links";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../global/Context/UserContext";
import { useContext } from "react";

const RemoveOrMessage = ({ id }: IdProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const messageHandler = async () => {
    const chat_id = await getChatId();
    navigate("/chat-room/" + chat_id);
  };
  const getChatId = async () => {
    const response = await fetch(chatURL + `/get-chat_id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data.chat_id.chat_id;
    } else {
      userContext?.setNotification(data.message);
    }
  };
  const removeFriend = async () => {
    try {
      const chat_id = await getChatId();
      const response = await fetch(friendURL + `remove-friend/${chat_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        userContext?.setNotification(data.message);
      } else {
        userContext?.setNotification(data.message);
      }
    } catch (err) {
      userContext?.setNotification("Error in removing a friend.");
    }
  };
  return (
    <div className="flex gap-5">
      <AddFriendButton onClick={removeFriend} status="Remove Friend" />
      <AddFriendButton onClick={messageHandler} status="Message" />
    </div>
  );
};

export default RemoveOrMessage;
