import { useState } from "react";
import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import { friendURL } from "../../global/Links/Links";
import { IdProps } from "./Operations";

const AddFriend = ({ id }: IdProps) => {
  const [status, setStatus] = useState(false);
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
        console.log(data.message);
        setStatus(true);
      } else {
        console.log(data.message);
        setStatus(false);
      }
    } catch (err) {
      console.log("Error in adding a friend.");
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
