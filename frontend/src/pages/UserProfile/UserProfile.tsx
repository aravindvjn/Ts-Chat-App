import Logout from "./Logout"
import ProfileData from "./ProfileData"

const UserProfile = () => {
  return (
    <div className="p-5">
      <p className="font-bold text-lg pb-2">Account Settings</p>
      <ProfileData  />
      <Logout />
    </div>
  )
}

export default UserProfile
