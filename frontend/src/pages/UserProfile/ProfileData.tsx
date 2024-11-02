import { useContext } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { UserContext } from "../../global/Context/UserContext";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { Edit } from "@mui/icons-material";
import Share from "../../components/Share/Share";

const ProfileData = () => {
  const userData = useContext(UserContext);
  const user = userData?.user;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center gap-2 items-center pb-24">
      {user ? (
        <>
          <Avatar variant="double" src={user.profile_pic_url} />
          <div className="text-left w-full flex flex-col gap-1 mb-5 text-gray-600">
            <p>Name: {user.name}</p>
            <p>Username: @{user.username}</p>
            <p>Bio: {user.bio || "No bio available"}</p>
            <p>Joined on: {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
          <div className="w-full">
            <Share
              className="flex mb-5 justify-center items-center gap-1 cursor-pointer text-blue-600"
              variant="small"
              title={user?.name}
              text={user?.bio}
              url={"/profile-user/" + user?.user_id}
            >
              <p>Share Your Profile</p>
            </Share>
            <p className="text-gray-600 py-1">Edit Your Profile</p>
            <div
              onClick={() => {
                navigate("/edit-your-profile");
              }}
              className="flex mb-5 w-24 justify-center gap-2 items-center h-10 border-2 border-purple-800 text-purple-800 rounded-lg"
            >
              <Edit className="" />
              <p>Edit</p>
            </div>
            <p className="text-gray-600 py-1">Chane your Password</p>
            <div
              onClick={() => {
                navigate("/change-your-password");
              }}
              className="flex mb-5 w-56 justify-center gap-2 items-center h-10 border-2 border-purple-800 text-purple-800 rounded-lg"
            >
              <Edit className="" />
              <p>Chane your Password</p>
            </div>
            <p className="text-gray-600 py-1">Logout your account.</p>
            <Logout />
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
