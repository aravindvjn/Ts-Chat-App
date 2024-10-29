import { useEffect, useState } from "react";
import { friendURL } from "../../global/Links/Links";
import SingleProfile from "./SingleProfile";

const AllProfiles = () => {
  const [chatFriends, setChatFriends] = useState([]);
  useEffect(() => {
    const fetchAllFriends = async () => {
      try {
        const response = await fetch(friendURL + "all-friends");
        const data = await response.json();
        setChatFriends(data);
      } catch (err) {
        console.error("Error in Fetching chat Profiles", err);
      }
    };
    fetchAllFriends();
  }, []);
  return (
    <div>
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
      {chatFriends.length > 0 && chatFriends.map((chat) => <SingleProfile chat={chat} />)}
    </div>
  );
};

export default AllProfiles;
