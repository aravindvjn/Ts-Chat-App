import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import { IdProps } from "./Operations";

const RemoveOrMessage = ({id}:IdProps) => {
  return (
    <div className="flex gap-5">
      <AddFriendButton status="Remove Friend" />
      <AddFriendButton status="Message" />
    </div>
  );
};

export default RemoveOrMessage;
