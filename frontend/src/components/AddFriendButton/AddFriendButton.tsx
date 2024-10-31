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
  const AddFriendClasses = classNames("px-4 mt-2 py-2 rounded font-bold ", {
    "bg-green-600 text-white": status === "Add Friend" || status === "Accept",
    "bg-red-500 text-white": status === "Remove Friend" || status === "Reject",
    "bg-blue-500 text-white": status === "Requested",
    "border-2 border-black text-black": status === "Message",
    "text-background": status === "Loading",
  });
  return (
    <button onClick={onClick} className={AddFriendClasses}>
      {status}
    </button>
  );
};

export default AddFriendButton;
