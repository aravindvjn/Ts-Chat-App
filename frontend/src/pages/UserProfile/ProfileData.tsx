import { useContext } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { UserContext } from "../../global/Context/UserContext";

const ProfileData = () => {
  const userData = useContext(UserContext);
  const user = userData?.user;

  return (
    <div>
      {user ? (
        <>
          <Avatar src={user.profile_pic_url || "/default-avatar.png"} />
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Bio: {user.bio || "No bio available"}</p>
          <p>Joined on: {new Date(user.created_at).toLocaleDateString()}</p>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default ProfileData;
