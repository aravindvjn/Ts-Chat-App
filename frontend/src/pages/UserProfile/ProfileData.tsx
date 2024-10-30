import { useContext } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { UserContext } from "../../global/Context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileData = () => {
  const userData = useContext(UserContext);
  const user = userData?.user;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center gap-2 items-center">
      {user ? (
        <>
          <Avatar className="w-[224px] h-[189px]" src={user.profile_pic_url} />
          <div className="text-left w-full flex flex-col gap-1">
            <p>Name: {user.name}</p>
            <p>Username: @{user.username}</p>
            <p>Bio: {user.bio || "No bio available"}</p>
            <p>Joined on: {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </>
      ) : (
        <button
          className="bg-green-400 py-2 px-3 rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default ProfileData;
