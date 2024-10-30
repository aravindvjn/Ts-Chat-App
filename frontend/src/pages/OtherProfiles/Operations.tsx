import { useEffect, useState } from "react";
import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import { friendURL } from "../../global/Links/Links";
import AddFriend from "./AddFriend";
import AcceptOrReject from "./AcceptOrReject";
import RemoveOrMessage from "./RemoveOrMessage";
export type IdProps = {
  id?: string | undefined;
  reqId?: string | undefined;
};
// type statusType =  "Friend" | "Requested" | "Request" | "Stranger" | "Loading"
// type StatusProps = {
//   status: statusType;
//   setStatus: React.Dispatch<React.SetStateAction<statusType>>
// };

const Operations = ({ id }: IdProps) => {
  const [status, setStatus] = useState({ status: "Loading", payload: "" });
  useEffect(() => {
    const fetchFriendStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(friendURL + `friend-status/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch friend status");
        }
        const data = await response.json();
        setStatus(data);
        console.log(data);
      } catch (err) {
        console.log("Error in fetcing friend status", err);
      }
    };

    fetchFriendStatus();
  }, [id]);
  if (status.status === "Loading") return <AddFriendButton status="Loading" />;
  if (status.status === "Friend") return <RemoveOrMessage id={id} />;

  if (status.status === "Requested")
    return <AddFriendButton status="Requested" />;
  if (status.status === "Request")
    return <AcceptOrReject id={id} reqId={status?.payload} />;

  if (status.status === "Stranger") return <AddFriend id={id} />;
  return <AddFriendButton status="Loading" />;
};

export default Operations;
