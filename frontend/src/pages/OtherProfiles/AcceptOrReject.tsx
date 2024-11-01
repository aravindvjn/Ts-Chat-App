import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import { IdProps } from "./Operations";
import { friendURL } from "../../global/Links/Links";

const AcceptOrReject = ({ reqId }: IdProps) => {
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
        console.log(data.message);
    } catch (err) {
      console.log("Error in adding a friend.");
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
