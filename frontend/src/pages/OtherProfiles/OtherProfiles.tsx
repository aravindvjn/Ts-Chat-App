import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProps } from "../../global/Context/UserContext";
import { friendURL } from "../../global/Links/Links";
import Avatar from "../../components/Avatar/Avatar";
import Operations from "./Operations";
import Footer from "../../components/Footer/Footer";
import ChatHeader from "../ChatRoom/ChatHeader";
import Share from "../../components/Share/Share";

const OtherProfiles = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [otherUser, setOtherUser] = useState<UserProps>();
  useEffect(() => {
    const fetchAllFriends = async () => {
      try {
        const response = await fetch(friendURL + "single-user/" + id, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setOtherUser(data[0]);
        } else {
          console.log("Message", data.message);
        }
      } catch (err) {
        console.error("Error in Fetching chat Profiles", err);
      }
    };
    fetchAllFriends();
  }, []);
  if (!otherUser) {
    return (
      <>
        <ChatHeader />
        <div className="animate-pulse text-lg text-center pt-4">Loading..</div>
      </>
    );
  }
  return (
    <div className="p-5 pt-24 flex flex-col justify-center items-center">
      <ChatHeader />
      <Avatar variant="double" src={otherUser?.profile_pic_url} />

      <p className="font-bold text-lg pt-2">{otherUser?.name}</p>
      <p className="text-gray-500">@{otherUser?.username}</p>
      <div className="text-left mb-4 w-full">
        <p className="py-2"> {otherUser?.bio}</p>
        <p>
          Joined on:{" "}
          <strong>
            {new Date(otherUser?.created_at).toLocaleDateString()}
          </strong>
        </p>
      </div>
      <Operations id={id} />
      <Share
        className="flex my-5 items-center gap-1 cursor-pointer text-blue-600"
        variant="small"
        text={otherUser?.bio}
        title={otherUser?.name}
        url={"/profile-user/" + otherUser?.user_id}
      >
        <p>Share Profile</p>
      </Share>
      <Footer />
    </div>
  );
};

export default OtherProfiles;
