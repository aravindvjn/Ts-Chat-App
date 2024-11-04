import { useEffect, useState } from "react";
import { AppName, friendURL } from "../../global/Links/Links";
import SingleUser from "./SingleUser";
import { UserProps } from "../../global/Context/UserContext";

const Suggested = () => {
  const token = localStorage.getItem("token");
  const [limitedUsers, setLimitedUsers] = useState<UserProps[] | void[]>([]);
  const [number, setNumber] = useState<number>(3);
  const fetchAllFriends = async (n: number) => {
    try {
      const response = await fetch(friendURL + "all-friends/" + n, {
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
  useEffect(() => {
    fetchAllFriends(number);
  }, [number]);
  return (
    <div className="pb-24">
      <p className="font-bold p-2 pl-0 pb-0">New to {AppName}:</p>
      {limitedUsers.length > 0 ? (
        limitedUsers.map((user) => {
          if (user) {
            return <SingleUser key={user.user_id} user={user} />;
          }
          return null;
        })
      ) : (
        <div className="animate-pulse text-center pt-4">Loading..</div>
      )}
      {limitedUsers?.length >= 3 && limitedUsers.length % 3 === 0 && (
        <p
          className="text-center pt-5 text-link"
          onClick={() => {
            setNumber(number + 3);
          }}
        >
          SEE MORE
        </p>
      )}
    </div>
  );
};

export default Suggested;
