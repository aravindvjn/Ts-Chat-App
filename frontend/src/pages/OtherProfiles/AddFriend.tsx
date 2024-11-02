import { useContext, useState } from "react";
import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import { friendURL } from "../../global/Links/Links";
import { IdProps } from "./Operations";
import { UserContext } from "../../global/Context/UserContext";

const AddFriend = ({ id }: IdProps) => {
  const [status, setStatus] = useState(false);
  const userContext = useContext(UserContext);

  const addToFriend = async () => {
    const token = localStorage.getItem("token");
    try {
      setStatus(true);
      const response = await fetch(friendURL + "send-friend-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver_id: id }),
      });
      const data = await response.json();
      if (response.ok) {
        userContext?.setNotification(data.message);
        setStatus(true);
      } else {
        userContext?.setNotification(data.message);
        setStatus(false);
      }
    } catch (err) {
      userContext?.setNotification("Error in adding a friend.");
      setStatus(false);
    }
  };
  return (
    <AddFriendButton
      onClick={addToFriend}
      status={status ? "Requested" : "Add Friend"}
    />
  );
};

export default AddFriend;
