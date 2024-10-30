import classNames from "classnames";

export type AddFriendButtonProps = {
  status?:
    | "Add Friend"
    | "Requested"
    | "Remove Friend"
    | "Reject"
    | "Accept"
    | "Message"
    | "Loading";
  onClick?: () => void;
};
const AddFriendButton = ({
  status = "Add Friend",
  onClick,
}: AddFriendButtonProps) => {
  const AddFriendClasses = classNames("px-4 mt-2 py-2 rounded font-bold text-white", {
    "bg-green-600": status === "Add Friend" || status === "Accept",
    "bg-red-500": status === "Remove Friend" || status === "Reject",
    "bg-blue-500": status === "Requested",
    "border-2 border-gray-900 text-gray-900": status === "Message",
    "text-background": status === "Loading",
  });
  return (
    <button onClick={onClick} className={AddFriendClasses}>
      {status}
    </button>
  );
};

export default AddFriendButton;
