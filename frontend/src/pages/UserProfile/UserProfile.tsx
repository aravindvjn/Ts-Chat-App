import Footer from "../../components/Footer/Footer";
import ProfileData from "./ProfileData";

const UserProfile = () => {
  return (
    <div className="p-5 h-dvh overflow-scroll">
      <p className="font-bold text-lg pb-2">Account Settings</p>
      <ProfileData />
      <Footer />
    </div>
  );
};

export default UserProfile;
