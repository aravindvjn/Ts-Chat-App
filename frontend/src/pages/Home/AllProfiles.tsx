import { useEffect, useState } from "react";
import { chatURL } from "../../global/Links/Links";
import SingleProfile from "./SingleProfile";

const AllProfiles = () => {
  const [chatFriends, setChatFriends] = useState([]);
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
        setChatFriends(data);
        console.log(data);
      } catch (err) {
        console.error("Error in Fetching chat Profiles", err);
      }
    };
    fetchAllFriends();
  }, []);
  return (
    <div>
      {chatFriends.length > 0 &&
        chatFriends.map((chat) => {
          return <SingleProfile chat={chat} />;
        })}
    </div>
  );
};

export default AllProfiles;
