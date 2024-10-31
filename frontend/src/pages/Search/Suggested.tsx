import { useEffect, useState } from "react";
import { AppName, friendURL } from "../../global/Links/Links";
import SingleUser from "./SingleUser";
import { UserProps } from "../../global/Context/UserContext";

const Suggested = () => {
  const token = localStorage.getItem("token");
  const [limitedUsers, setLimitedUsers] = useState<UserProps[] | void[]>([]);
  useEffect(() => {
    const fetchAllFriends = async () => {
      try {
        const response = await fetch(friendURL + "all-friends/5", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setLimitedUsers(data);
        } else {
          console.log("Message", data.message);
        }
      } catch (err) {
        console.error("Error in Fetching chat Profiles", err);
      }
    };
    fetchAllFriends();
  }, []);
  return (
    <div>
      <p className="font-bold p-2 pl-0 pb-0">New to {AppName}:</p>
      {limitedUsers.length > 0 &&
        limitedUsers.map((user) => {
          if (user) {
            return <SingleUser key={user.user_id} user={user} />;
          }
          return null;
        })}
    </div>
  );
};

export default Suggested;
