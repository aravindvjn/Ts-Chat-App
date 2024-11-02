import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { UserProps } from "../../global/Context/UserContext";

type SingleUserProps = {
  user?: UserProps;
};
const SingleUser = ({ user }: SingleUserProps) => {
  const navigate = useNavigate();
  return (
    <div data-aos="slide-up"
      className="p-2 border-b flex gap-4 cursor-pointer"
      onClick={() => navigate("/profile-user/" + user?.user_id)}
    >
      <Avatar variant="small" src={user?.profile_pic_url} />
      <div>
        <p className="font-medium">{user?.name}</p>
        <p className="opacity-40 text-[12px]">@{user?.username}</p>
      </div>
    </div>
  );
};

export default SingleUser;
