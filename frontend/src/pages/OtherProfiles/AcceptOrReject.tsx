import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import { IdProps } from "./Operations";
import { friendURL } from "../../global/Links/Links";
import { useContext } from "react";
import { UserContext } from "../../global/Context/UserContext";

const AcceptOrReject = ({ reqId }: IdProps) => {
  const userContext = useContext(UserContext);
  const updateReq = async (action: string) => {
    const token = localStorage.getItem("token");
    try {
      const method = action === "Accept" ? "POST" : "DELETE";
      const response = await fetch(friendURL + `friend-request/${reqId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      userContext?.setNotification(data.message);
    } catch (err) {
      userContext?.setNotification("Error in adding a friend.");
    }
  };
  return (
    <div className="flex gap-5">
      <AddFriendButton onClick={() => updateReq("Accept")} status="Accept" />
      <AddFriendButton onClick={() => updateReq("Reject")} status="Reject" />
    </div>
  );
};

export default AcceptOrReject;
