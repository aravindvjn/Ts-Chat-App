import Avatar from "../../components/Avatar/Avatar";
import { SingleProfileProps } from "./type";

const SingleProfile = ({ chat }: SingleProfileProps) => {
  return (
    <div className="bg-secondary text-black p-5 flex justify-between mt-1 border-t">
      <div className="overflow-hidden px-2 w-1/2 relative text-[12px]">
        <p className="pb-1 font-semibold text-[14px]">{chat?.name}</p>
        <p className="bottom-0 opacity-80">
          {chat?.msg && chat?.msg.length > 30
            ? chat.msg.slice(0, 20) + "..."
            : chat?.msg}
        </p>
        <p className="opacity-50">{chat?.time}</p>
      </div>
      <Avatar  />
    </div>
  );
};

export default SingleProfile;
