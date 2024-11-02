import { useContext, useEffect, useState } from "react";
import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import { friendURL } from "../../global/Links/Links";
import AddFriend from "./AddFriend";
import AcceptOrReject from "./AcceptOrReject";
import RemoveOrMessage from "./RemoveOrMessage";
import { UserContext } from "../../global/Context/UserContext";
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
  const userContext = useContext(UserContext);
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
      } catch (err) {
        console.log("Error in fetcing friend status", err);
      }
    };

    fetchFriendStatus();
  }, [id]);
  if(userContext?.user?.user_id === id){
    return null;
   }
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
