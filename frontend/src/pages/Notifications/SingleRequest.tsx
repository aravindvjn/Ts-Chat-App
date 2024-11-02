import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import AcceptOrReject from "../OtherProfiles/AcceptOrReject";
import { RequestProps } from "./type";

const SingleRequest = ({ req }: RequestProps) => {
  const navigate = useNavigate();
  return (
    <div className="border-y p-4">
      <div
        className="flex gap-3"
        onClick={() => navigate("/profile-user/" + req?.sender_id)}
      >
        <Avatar src={req.profile_pic_url} />
        <div>
          <p className="font-semibold text-[14px]">{req?.name}</p>
          <p className="opacity-65 text-[12px]">@{req?.username}</p>
          <AcceptOrReject reqId={req?.request_id} id={req?.sender_id} />
        </div>
      </div>
    </div>
  );
};

export default SingleRequest;
